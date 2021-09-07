![handler_typescript](https://user-images.githubusercontent.com/71246795/132264053-e086bf73-ba4c-4752-8982-e05861088f5e.png)


<div align= "center">
  <h1>Multiple command handler for typescript.<b1><br>By: <a href= "https://github.com/Chere3">Cheree</a>
  </div>
  
  ### Features:
  
  - Have support to slash commands.
  - Works with discord.js V13.
  - Typescript version.
  - Has updated documentation for all types of users.
  - Multillang.
    
<br>
  
## Options for commands
  
#### Name
This is the name of the command, all answers of messages with `<prefix><name of command>` returns the code of this, is recommended to are only a one word, this is a `String`
```javascript
name: String
name: "ping"
```
<br>
    
#### Description
The description of the command, this returns the description of the command, is util to help command. This a `String`
```javascript
description: String
description: "Ping command"
```
<br>    
    
#### Aliases
The aliases for the command, if the command name not found, search in aliases of the command to return that answer. This a `Array`
```javascript
aliases?: String[]
aliases?: ["pong", "status"]
```
<br>    
    
#### Category
The category of the command, if dont have category, is changed with `bot`. This a `String`
```javascript
category?: String
category?: "bot"
```
 <br>   
    
#### Dev
Defines if the command, are disponible to everyone or the owners defined in `src/config.ts`. This a `Boolean`.
```javascript
dev?: Boolean
dev?: false
```
<br>    
    
#### NSFW
Defines if the command, can be executed in only nsfw channels of no. This a `Boolean`.
```javascript
nsfw?: Boolean
nsfw?: false
```
<br>

#### Cooldown
The cooldown of the command, if the user is not a developer returns a message with the cooldown of the mentioned seconds, this a `Number`
```javascript
cooldown?: Number
cooldown?: 10
```
<br>    

#### botPermissions
The bot detects if have one or the permissions of the `Array` can be executed, if i dont have one of the permissions, return a message saying that the bot has not have permissions.
```javascript
 botPermissions?: PermissionString[]
 botPermissions?: ["SEND_MESSAGES", "MANAGE_MESSAGES"]
 ```
 <BR>
 
 #### botPermissions
The bot detects if the user that execute the command have one or the permissions of the `Array` can be executed, if user dont have one of the permissions, return a message saying that the bot has not have permissions.
```javascript
 botPermissions?: PermissionString[]
 botPermissions?: ["MANAGE_GUILD"]
 ```
<br> 

### usage
The usage of the command, the excellent `Method` for documentation.
```javascript
usage?(prefix: String): String
usage("!")ping
```
<br>   

### example
The example of the command, the excellent `Method` for documentation.
```javascript
usage?(prefix: String): String
usage("!")ping
```
   
<br>
   
## Example of a command
   
```typescript
import { TempContext } from "../../Util/Classes/Context";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { Client } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class PingCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: `ping`,
      description: `Test the bot`,
      guildOnly: false,
      dev: true,
      usage: (prefix: "!")ping,
      example: (prefix: "!")ping
    });
  }

  async run(base: TempContext) {
    base.channel.send(`pong!`)
  }
}
```
