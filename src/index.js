import osascript from "node-osascript";
import { resolve } from "path";
import when from "when";
import { lift } from "when/node";
import inquirer from "inquirer";
import commander from "commander";

const executeFile = lift( osascript.executeFile );
const questions = [
	{
		type: "list",
		message: "Recording state",
		name: "state",
		choices: [
			{ name: "Start", value: "start" },
			{ name: "Stop", value: "stop" }
		]
	},
	{
		type: "checkbox",
		message: "Features to toggle",
		name: "tasks",
		choices: [
			{ name: "Dock", value: "dock" },
			{ name: "Menu Bar", value: "menu" },
			{ name: "Notifications", value: "notifications" },
			{ name: "Screen Resolution", value: "screen" }
		]
	}
];

function getTasks( boss ) {
	const commands = [ "dock", "menu", "notifications", "screen" ];
	return commands.reduce( ( memo, command ) => {
		if ( boss[ command ] ) {
			memo.push( command );
		}
		return memo;
	}, [] );
}

function getScripts( { state, tasks } ) {
	return tasks.map( name => executeFile(
		resolve( __dirname, `./applescript/${ name }.applescript` ),
		{ state }
	) );
}

commander
	.version( "0.0.1" )
	.usage( "[options] <state>" )
	.option( "-d, --dock", "Dock" )
	.option( "-m, --menu", "Menu Bar" )
	.option( "-n, --notifications", "Notifications" )
	.option( "-s, --screen [size]", "Screen Resolution [size]" )
	.parse( process.argv );

if ( commander.dock || commander.menu || commander.notifications || commander.screen ) {
	const [ state ] = commander.args;
	const tasks = getTasks( commander );
	when.all( getScripts( { state, tasks } ) ).then( () => {
		console.log( "all done" ); // eslint-disable-line
	} );
} else {
	const [ state ] = commander.args;
	const list = questions.filter( question => {
		return !state || ( state && question.name !== "state" );
	} );
	inquirer.prompt( list ).then( answers => {
		const { state, tasks } = answers;
		when.all( getScripts( { state, tasks } ) ).then( () => {
			console.log( "all done" ); // eslint-disable-line
		} );
	} );
}
