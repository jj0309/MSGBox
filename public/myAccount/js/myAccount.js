const showEditPannel=()=>{
    const nodeARR = document.querySelectorAll('.UserPannelDisplay');
    const toHideNodeARR = document.querySelectorAll('.onEditHide');
    nodeARR.forEach(node => {
        node.style.display='block';
    });
    toHideNodeARR.forEach(node=>{
        node.style.display='none';
    })
}

// not DRY but bootstrap uses inline-block .... unpredictable display when we modify the style ...
const hideEditPannel=()=>{
    const hideARR = document.querySelectorAll('.UserPannelDisplay');
    const toHideNodeARR = document.querySelectorAll('.onEditHide');

    hideARR.forEach(node=>{
        node.style.display='none';
    })
    toHideNodeARR.forEach(node=>{
        node.style.display='inline-block';
    })
    document.querySelector('.Description').style.display = 'block';
}