import { IPog } from '../../@types';
import { POG_ARR } from './pog-tractor';

// Construct a custom response array with the appropriate data:
export function HandleDataReq(req: any): IPog[] {
    const requestedChannels: string[] | null = req.body.channelNames;
    let channelDataArr: IPog[] = [  ];

    if (requestedChannels && requestedChannels.length > 0) {
        console.log(`[PROCESS] Requested data on: ${requestedChannels}`);

        let i: number;
        let j: number;
        for (i = 0; i < requestedChannels.length; i++) {
            for (j = 0; j < POG_ARR.length; j++) {
                if (`#${requestedChannels[i].toLowerCase()}` === POG_ARR[j].channelName) {
                    // Add the data to the custom user requested arr
                    channelDataArr.push({
                        channelName: requestedChannels[i],
                        totalPogTally: POG_ARR[j].totalPogTally
                    })

                    break;
                }
            }
        }
    }

    return channelDataArr;
}