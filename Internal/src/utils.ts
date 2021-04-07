import { IPog } from "../../@types";

// Increment the totalPogTally for the correct channel in the arr:
export function IncrementTallyInArr(MAIN_ARR: IPog[], channel: string): void {
    let index: number;
    for (index = 0; index < MAIN_ARR.length; index++) {
        if (MAIN_ARR[index].channelName === channel) {
            MAIN_ARR[index].totalPogTally ++;
        }
    }
}