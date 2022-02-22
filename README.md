# whats-up

A social interaction blog for free thinkers.

## Description

Building a node-based social interaction blog using mongoDB (noSQL) and mongoose (ODM) site.

## Table Of Contents

- [whats-up](#whats-up)
  - [Description](#description)
  - [Table Of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)

## Installation

To install locally, clone this repository to your local environment.  This is a node application, so node must be installed.  mongoDB must also be installed locally.  For mongoDB documentation and installation instructions see https://docs.mongodb.com/manual/introduction/.  If you need to install node, check out this link  https://nodejs.org/en/download/.  Once mongoDB and node (and npm) are installed, attach to the repository root directory and update npm dependencies with the following command:

**npm install express mongoose**  

See demo of the installation process below...  
  
https://user-images.githubusercontent.com/90280725/155230378-74e5330a-6082-4bf0-9a47-9670f821be6e.mp4  

## Usage
  
To bring up the mongoDB server, from the root directory of the repository clone, in the command-line terminal type the following:  
  
**npm start**  
  
The node server will remain running in the terminal until it is terminated with a CTRL-C keystroke.  
  
See the following demo for how to start the server...  
  
https://user-images.githubusercontent.com/90280725/155232751-45a57226-3b60-4221-bb7e-ab4cdb61dcd4.mp4  
  


There are 2 mongoose models; "User" and "Thought", defined by their corresponding schemas. There is also a schema, "Reaction" that belongs to the "Thought" schema definition, and is stored as a sub-document in the "reactions" array of the "Thought" document. Here are the summarized definitions.
1. The "User" model instantiates the "User" schema as a document collection whose documents can be (recursively) referenced in the "friends" array in the "User" document. 
2. The "Thought" model instantiates the "Thought" schema as a document collection whose documents can also be referenced in the "User" document in the array "thoughts". The "Thought" document also contains the array "reactions" which stores sub-documents defined by the "Reactions" schema. 
   
Summary of Collections Associations:  
* User (contains reference to "Thought" in "thoughts" array, and contains reference to "User" in "friends" array)  
* Thought (contains reference to "Reaction" in "reactions" array)  
  
This server uses the Express server, mongoDB and the mongoose ODM to manage and manipulate data stored in the mongoDB database instance.

See the following demo to understand the functionality available through the REST API using the HTTP GET method for all User(s) and all Thought(s).  
  
  
https://user-images.githubusercontent.com/90280725/155230652-50418762-ef3e-4f9b-a510-caf2880a3f04.mp4  
  

  
See the following demo to understand the functionality available through the REST API using the HTTP GET method for single User and single Thought.  
  
https://user-images.githubusercontent.com/90280725/155230772-e25faf27-2a14-4496-a8cd-dfe4119f2b5a.mp4  
  
See the following demo to understand the functionality available through the REST API using the HTTP POST, PUT, and DELETE methods for a User.  
  
https://user-images.githubusercontent.com/90280725/155230920-c5aa8522-e086-45db-b965-d378a4ce9f41.mp4  
  


See the following demo to understand the functionality available through the REST API using the HTTP POST, PUT, and DELETE methods for a Thought.  
  
https://user-images.githubusercontent.com/90280725/155231042-a2e4bf2b-7f84-4c66-8f90-6a500849290f.mp4  
  


See the following demo to understand the functionality available through the REST API using the HTTP POST and DELETE methods for friends.  
  
https://user-images.githubusercontent.com/90280725/155231140-45af1d00-b29d-4bd3-9adc-77b9a2932cc2.mp4  
  


See the following demo to understand the functionality available through the REST API using the HTTP POST and DELETE methods for reactions (to thoughts).  
  
https://user-images.githubusercontent.com/90280725/155231244-0df6297a-869c-4e38-9df9-9dc0b629f17b.mp4  




## Questions

Any questions, please contact Mark Dale.

My email address is: msdaledad@gmail.com
My github profile is https://github.com/msdale
