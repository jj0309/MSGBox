const showEditPannels=()=>{
    const nodeARR = document.querySelectorAll('.UserPannelDisplay');
    const toHideNodeARR = document.querySelectorAll('.onEditHide');
    nodeARR.forEach(node => {
        node.style.display='block';
    });
    toHideNodeARR.forEach(node=>{
        node.style.display='none';
    })
}