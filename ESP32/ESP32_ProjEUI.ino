#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
//#include <Preferences.h>

//Definição do pino de leitura da umidade
#define sensorUmidade A0

//Definindo credenciais para acesso ao WiFi
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

//Definições para acesso ao banco de dados
#define API_KEY ""
#define FIREBASE_PROJECT_ID ""

//Definições usuario registrado
#define USER_EMAIL ""
#define USER_PASSWORD ""

//Inicialização das funções de acesso do Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

//Inicialização da função de acesso a EEPROM para gravar preferências (TBD)
//Preferences preferences;

//Variável para controle de tempo
unsigned long dataMillis = 0;
int count = 0;

// Função de Callback do Firebase (Escrita pelo autor da biblioteca (Mobizt))
void fcsUploadCallback(CFS_UploadStatusInfo info)
{
    if (info.status == fb_esp_cfs_upload_status_init)
    {
        Serial.printf("\nUploading data (%d)...\n", info.size);
    }
    else if (info.status == fb_esp_cfs_upload_status_upload)
    {
        Serial.printf("Uploaded %d%s\n", (int)info.progress, "%");
    }
    else if (info.status == fb_esp_cfs_upload_status_complete)
    {
        Serial.println("Upload completed ");
    }
    else if (info.status == fb_esp_cfs_upload_status_process_response)
    {
        Serial.print("Processing the response... ");
    }
    else if (info.status == fb_esp_cfs_upload_status_error)
    {
        Serial.printf("Upload failed, %s\n", info.errorMsg.c_str());
    }
}

void setup()
{
  //Inicia comunicação serial com o console
  Serial.begin(115200);

  //Reserva um espaço na EEPROM para configuração
  //preferences.begin("config", false);

  //Conecta a placa a rede WiFi configurada
  conectaWiFi();
  
  //Realiza a configuração e conecta com o servidor do Firebase
  setupFirebase();
  
  //Registra o módulo caso não esteja registrado no banco de dados
  registraModulo("user01");

  //Designa o pino 2 (led da placa) como saída digital
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  int umidadeMin = getUmidadeMin("user01");
  int leitura = lerSensor();

  atualizaUmidade("user01", leitura);

  Serial.println("Umidade minima:  " + String(umidadeMin) + "\t" +  "Leitura:  " + String(leitura));

  if(leitura < umidadeMin){
    digitalWrite(LED_BUILTIN, HIGH); //liga a "bomba" de água
    delay(5000); //Espera 5s com a bomba ligada
    digitalWrite(LED_BUILTIN, LOW); //desliga "bomba" de água
  }

  delay(60000);
}

void conectaWiFi(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Conectando ao Wi-FI");

  while (WiFi.status() !=WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }

  Serial.println();
  Serial.print("Conectado com IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void setupFirebase(){
  Serial.printf("Cliente do Firebase v%s\n\n", FIREBASE_CLIENT_VERSION);

  //setup do acesso ao banco de dados
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  //Configura o callback e limita o tamanho do payload
  config.token_status_callback = tokenStatusCallback;
  fbdo.setResponseSize(2048);

  //Inicia conexão com o Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

int lerSensor() {
  int leitura = analogRead(sensorUmidade);
  int porc=constrain(leitura,2400,4095);
  porc=map(porc, 2400, 4095, 100 ,0);

  return porc;
}

void atualizaUmidade(String id, int umidade){
  FirebaseJson content;
  String documentPath = id + "/" + String(WiFi.macAddress());

  content.set("fields/umidadeAgora/integerValue", umidade);
  if (Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "umidadeAgora"))
      Serial.println("Gravado umidade medida.");
  else
    Serial.println(fbdo.errorReason());
}

void registraModulo(String id){
  FirebaseJson content;
  String documentPath = id + "/" + String(WiFi.macAddress());

  content.set("fields/diasPlantado/integerValue", 0);
  content.set("fields/nome/stringValue", "não selecionado");
  content.set("fields/umidadeAgora/integerValue", 0);
  content.set("fields/umidadeMin/integerValue", 0);

  Serial.print("Criando registro... ");

  if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw()))
    Serial.println("Registrado módulo com ID:" + String(WiFi.macAddress()));
  else
    Serial.println(fbdo.errorReason());
}

int getUmidadeMin(String id){
  FirebaseJson payload;
  FirebaseJsonData umidadeMin;
  String documentPath = id + "/" + String(WiFi.macAddress());
  String mask = "umidadeMin";

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str())){
    payload.setJsonData(fbdo.payload().c_str());
    payload.get(umidadeMin, "fields/umidadeMin/integerValue");
  }
  else
    Serial.println(fbdo.errorReason());
  
  return umidadeMin.to<int>();
}