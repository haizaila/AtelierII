/* AIIEi - Karate 
adapted by Salisa Jatuweerapong
reference: blank PubNub sketch by Kate Hartman / Nick Puckett
 */

// server variables

var dataServer;
var pubKey = 'pub-c-04865ac3-c615-4d71-950a-610c7abc805a'; //new
var subKey = 'sub-c-35fc5cb0-1363-11e9-a898-9ef472141036';



//name used to sort your messages. used like a radio station. can be called anything
var channelName = "phonePosition";

var xPos;

function setup() 
{
  getAudioContext().resume();
  createCanvas(windowWidth,windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});


}

function draw() 
{
// //draw the text
// fill(255);
// textSize(40);
// textAlign(CENTER, CENTER);

// //draw x
// text("X",width*0.25,(height/2)-60);
// text(xPos,width*0.25,(height/2)+60);
// // //draw y
// // text("Y",width*0.75,(height/2)-60);
// // text(yPos,width*0.75,(height/2)+60);
// // //draw z
// // text("Z",width*0.75,(height/2)-60);
// // text(zPos,width*0.75,(height/2)+60);

}


///uses built in deviceMoved function to send the data to the pubnub server
function deviceMoved() { //default threshold is set to 0.5.

  xPos = rotationX; //rotationX is a built in code. 
  // yPos = rotationY; 
  // zPos = rotationZ; 
 
  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        xRotation: xPos       //  we using xRotation 2 call it elsewhere!!!!!!!!!!
        
      }
    });

}

function draw() { 

  console.log(xPos); 
  //draw the text
fill(255);
textSize(40);
textAlign(CENTER, CENTER);

//draw x
text("X",width*0.25,(height/2)-60);
text(xPos,width*0.25,(height/2)+60);

text(rotationX,width*0.25,(height/2)+60);
// //draw y
// text("Y",width*0.75,(height/2)-60);
// text(yPos,width*0.75,(height/2)+60);
// //draw z
// text("Z",width*0.75,(height/2)-60);
// text(zPos,width*0.75,(height/2)+60);

  }

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

    console.log(inMessage.message.xRotation);
  }
}

