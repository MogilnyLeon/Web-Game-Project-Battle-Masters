ddEventListener("DOMContentLoaded", () => {
    let images = document.getElementsByClassName("image");
    images = Array.from(images);
    console.log(images);
    images.forEach(image => {
        image.addEventListener("click", () => {
            console.log(image);
            image.style.backgroundColor = "#ddd";
        });
    });
    images.forEach(image => {
        image.addEventListener("dblclick", () => {
            console.log(image);
            image.style.backgroundColor = "#F1F1F1";
        });
    });

    //Valid API call to fetch custom sprites:
    //https://api.infinitefusion.org/custom-sprites/329.59
    //from infinitefusion.org (no documentation th :/)

    const url = `https://cdn.jsdelivr.net/gh/vishnubai87/custom-sprites/CustomBattlers/9.6.png`
    
    const downloadImage =  async (url) =>{
        const image = await FetchImage(url);
        return URL.createObjectURL(image);
    }
    
    async function FetchImage(url) {
        const response = await fetch(url);
        if (!response.ok) {
            return new Error("uh oh! Image was wrong");
        }
        return response.blob();
    }


    
    downloadImage(url)
    .then();
    src = images[0].getAttribute("src");

    console.log(temp);

    src = temp;
});