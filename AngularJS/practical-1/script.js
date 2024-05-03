const readTextFile = (file) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("about-content").innerText = xhr.responseText;
        }
    };
    xhr.send();
}

const readfile = ()=>{
    readTextFile("about.txt");
}