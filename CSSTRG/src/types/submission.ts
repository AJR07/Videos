import {House} from "./house";

export interface Submission {
	timestamp: Date;
	name: string;
	question: string;
	score: number;
	house: House;
}