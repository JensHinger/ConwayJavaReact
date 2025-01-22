const baseURL: string = "http://localhost:8080/";

export async function getGame(): Promise<boolean[][]>{
    const request = new Request(baseURL + "game", {method:"GET"});

    return fetchStandardReq(request);
}

export async function getNextStep(): Promise<boolean[][]>{
    const request = new Request(baseURL + "game", {method:"POST"})

    return fetchStandardReq(request);
}

export async function initGame(size: number): Promise<boolean[][]>{
    const request = new Request(baseURL + "game/size/" + size, {method:"PUT"});

    return fetchStandardReq(request);
}

export async function randomizeGame(): Promise<boolean[][]>{
    const request = new Request(baseURL + "game/randomize", {method:"POST"});

    return fetchStandardReq(request);
}

export async function clearGame(): Promise<boolean[][]>{
    const request = new Request(baseURL + "game/clear", {method:"POST"});

    return fetchStandardReq(request);
}

export async function changeCell(x:number, y:number): Promise<boolean[][]>{
    const request = new Request(baseURL + "game/" + y + "_" + x, {method:"POST"});

    return fetchStandardReq(request);
}


// TODO What return -> nothing in one path 
async function fetchStandardReq(request: Request){
    try{
        const response = await fetch(request);
        const parsedResponse = await response.json();

        return parsedResponse;
    } catch(error){
        console.error(error);
    }
}