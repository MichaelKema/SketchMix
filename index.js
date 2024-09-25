function getRandomExercises() {
    const random = Math.random;
    const line = [
        { name: "Super Imposed Lines", url: "https://drawabox.com/lesson/1/superimposedlines" },
        { name: "Ghosted Lines", url: "https://drawabox.com/lesson/1/ghostedlines" },
        { name: "Ghosted Planes", url: "https://drawabox.com/lesson/1/ghostedplanes" }
    ];
    const ellipses = [
        { name: "Tables of Ellipses", url: "https://drawabox.com/lesson/1/tablesofellipses" },
        { name: "Ellipses in Planes", url: "https://drawabox.com/lesson/1/ellipsesinplanes" },
        { name: "Funnels", url: "https://drawabox.com/lesson/1/funnels" }
    ];
    const boxes = [
        { name: "Plotted Perspective", url: "https://drawabox.com/lesson/1/plottedperspective" },
        { name: "Rough Perspective", url: "https://drawabox.com/lesson/1/roughperspective" },
        { name: "Rotated Box", url: "https://drawabox.com/lesson/1/rotatedboxes" },
        { name: "Organic Perspective", url: "https://drawabox.com/lesson/1/organicperspective" }
    ];
    const shape3d = [
        { name: "Organic Arrow", url: "https://drawabox.com/lesson/2/organicarrows" },
        { name: "Organic Forms with Contour Lines", url: "https://drawabox.com/lesson/2/contourlines" }
    ];
    const texture = [
        { name: "Texture Analysis", url: "https://drawabox.com/lesson/2/textureanalysis" },
        { name: "Dissections", url: "https://drawabox.com/lesson/2/dissections" }
    ];
    const construction = [
        { name: "Form Intersection", url: "https://drawabox.com/lesson/2/formintersections" },
        { name: "Organic Intersection", url: "https://drawabox.com/lesson/2/organicintersections" }
    ];
    
    const nestedArray = [line, ellipses, boxes, shape3d, texture, construction];

    const availableIndices = [...Array(nestedArray.length).keys()];

    const selectedExercises = [];

    for (let i = 0; i < 3; i++) {
        const index = Math.floor(random() * availableIndices.length);
        const outerIndex = availableIndices[index];
        const innerIndex = Math.floor(random() * nestedArray[outerIndex].length);
        selectedExercises.push(nestedArray[outerIndex][innerIndex]);
        availableIndices.splice(index, 1);
    }

    return selectedExercises;
}

const  drawingsubjects = [];

// When the button is clicked, generate new exercises and update the labels with hyperlinks
const myButton = document.getElementById("myButton");
myButton.onclick = function() {
    const exercises = getRandomExercises();
    document.getElementById("exercise1").innerHTML = `<a href="${exercises[0].url}" target="_blank">${exercises[0].name}</a>`;
    document.getElementById("exercise2").innerHTML = `<a href="${exercises[1].url}" target="_blank">${exercises[1].name}</a>`;
    document.getElementById("exercise3").innerHTML = `<a href="${exercises[2].url}" target="_blank">${exercises[2].name}</a>`;
    
};

const columnbutton = document.getElementById("columnbutton");
const reversebutton = document.getElementById("reversebutton");



document.addEventListener('DOMContentLoaded', function() {
    var openPopupButton = document.getElementById('openPopup');
    var closePopupButton = document.getElementById('closePopup');
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');

    openPopupButton.addEventListener('click', function() {
        overlay.classList.add('show');
        popup.classList.add('show');
    });

    closePopupButton.addEventListener('click', function() {
        overlay.classList.remove('show');
        popup.classList.remove('show');
    });

    overlay.addEventListener('click', function() {
        overlay.classList.remove('show');
        popup.classList.remove('show');
    });
});
