import Output from 'utilities/output';
import Worker from 'worker/worker';
import WorkerTask from 'worker/workertasks';
import * as TaskTypes from 'worker/tasktypes';
import { WebSocketServer } from 'ws';

const WorkerID = 1; // ?Temporary
Output.Log("Starting the client...");

const wsServer = new WebSocketServer({port: 9891});

wsServer.on('connection', async (ws) => {
    Output.Log("Connection established with server.");
    ws.on('message', async (message) => {
        Output.Log("Message received from server: " + message);
        if (message == "finished")
            await AddDuolingoTask();
    });
    ws.on('close', () => {
        Output.Log("Connection closed with server.");
    });
    ws.on('error', (error) => {
        Output.Log("Error: " + error);
    });
});

const worker = new Worker(`worker::${WorkerID}`, {
    headless: false
});

async function AddDuolingoTask()
{
    await worker.AddTask(new WorkerTask(new TaskTypes.Visit("https://invite.duolingo.com/BDHTZTB5CWWKTJNGB33QPXTKCU"),
            new TaskTypes.InternalEval("(async ()=>{ await test(); })().catch((e)=>{});"),
            new TaskTypes.ClickSelector(".uS_Xr._2s7-g.zA0zE"),
            new TaskTypes.WaitForSelector("._3C_oC.XH783"),
            new TaskTypes.ClickSelector("._3C_oC.XH783"),
            new TaskTypes.ClickSelector("._24dlP._3HhhB._2NolF._275sd._1ZefG.gJ3Z4"),
            new TaskTypes.ClickSelector("._3C_oC.XH783"),
            new TaskTypes.Visit("https://www.duolingo.com/learn"),
            new TaskTypes.WaitForSelector("._24dlP._3HhhB._2NolF._275sd._1ZefG._3_hiz.VjPpX"),
            new TaskTypes.ClickSelector("._24dlP._3HhhB._2NolF._275sd._1ZefG._3_hiz.VjPpX"),
            new TaskTypes.FocusSelector("._3MNft.fs-exclude[data-test=\"full-name-input\"]"),
            new TaskTypes.KeyboardPress("xdd lmao n" + Math.floor(Math.random() * 1000)),
            new TaskTypes.FocusSelector("._3MNft.fs-exclude[data-test=\"age-input\"]"),
            new TaskTypes.KeyboardPress("18"),
            new TaskTypes.FocusSelector("._3MNft.fs-exclude[data-test=\"email-input\"]"),
            new TaskTypes.KeyboardPress("18"),
            new TaskTypes.KeyboardPress(`ajfnaf${Math.floor(Math.random() * 1000)}+${Math.floor(Math.random() * 1000)}@gmail.com`),
            new TaskTypes.FocusSelector("._3MNft.fs-exclude[data-test=\"password-input\"]"),
            new TaskTypes.KeyboardPress("xdE@gjm23g2" + Math.floor(Math.random() * 1000)),
            new TaskTypes.ClickSelector("._1rl91._3HhhB._2NolF._275sd._1ZefG._2oW4v"),
            new TaskTypes.WaitForSelector("._2_rf-._3HNwo")
    ));
}

// MODIFIED SHEPHERD ENGINE

(async () => {
    await AddDuolingoTask();
})().catch((err) => {
    Output.Error(err);
});