export default(url) => new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => {
        if (req.status === 200) {
            var response=JSON.parse(req.response);
            resolve(response);
        } else {
            reject(Error(req.statusText));
        }
    };
    req.onerror = () => {
        reject(Error("Some error occured."));
    };
    req.send();
})
