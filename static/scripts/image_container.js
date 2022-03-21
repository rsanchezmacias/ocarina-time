
{
    // Block responsible for resizing container on top of ocarina image as window resizes

    const IMG_WIDTH = 1108;
    const IMG_HEIGHT = 931;
    const IMG_WH_RATIO = IMG_WIDTH / IMG_HEIGHT;
    const IMG_HW_RATIO = IMG_HEIGHT / IMG_WIDTH;

    /*
        1. If the width to height ratio is greater than original, then we need to resize the width 
        2. If the height to width ratio is greater than original, then we need to resize the height
        3. If either one is smaller, then just set it equal to container size  
    */
    const resizeObserver = new ResizeObserver(entries => {
        let ocarinaContainer = document.querySelector(".ocarina__img");
        let yellowContainer = document.querySelector(".yellow-container");
        let dimensions = ocarinaContainer.getBoundingClientRect();
        let currentWidth = dimensions['width'];
        let currentHeight = dimensions['height'];

        let aWidthOverHeight = currentWidth / currentHeight;
        let aHeightOverWidth = currentHeight / currentWidth;

        // Set height and width equal to the actual image
        if (aWidthOverHeight > IMG_WH_RATIO) {
            let yellowContainerWidth = currentHeight * IMG_WH_RATIO;
            yellowContainer.style.width = yellowContainerWidth + "px";
        } else {
            yellowContainer.style.width = currentWidth + "px";
        }

        if (aHeightOverWidth > IMG_HW_RATIO) {
            let yellowContainerHeight = currentWidth * IMG_HW_RATIO;
            yellowContainer.style.height = yellowContainerHeight + "px";
        } else {
            yellowContainer.style.height = currentHeight + "px";
        }

        // Center the container yellow box
        let yellowContainerDimensions = yellowContainer.getBoundingClientRect();
        let yellowWidth = yellowContainerDimensions['width'];
        let yellowHeight = yellowContainerDimensions['height'];

        let horizontalExtraSpace = currentWidth - yellowWidth;
        let verticalExtraSpace = currentHeight - yellowHeight;

        yellowContainer.style.left = (horizontalExtraSpace / 2) + "px";
        yellowContainer.style.top = (verticalExtraSpace / 2) + "px";
    });


    resizeObserver.observe(document.querySelector('.ocarina'));
}
