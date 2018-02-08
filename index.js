$(function() {
  
  let boardQ = 1;

  
  $('.addNewGame').click(function(){
    
    let clone = $(".container:nth-child(1)").clone();
    
    clone.appendTo( "main" );
    boardQ ++;
    
    $(`.container:nth-child(${boardQ})`).children(".title").text(`Board ${boardQ}`);
    
    clearBoard( $(`.container:nth-child(${boardQ})`));
    
    $(`.container:nth-child(${boardQ})`).attr("id", `board${boardQ}`)
    $(`.container:nth-child(${boardQ})`).data("active", "O")
  })
  
  $('body').on('mousedown', '.tile', tileClickHandler)

  function tileClickHandler(e){
    let that = $(e.target);
    if( !that.attr("data-played")) {

      let container = that.closest(".container");
      
      let board = container.attr("id").substr(5);
      
      let active = container.data("active");

      if(container.attr("data-done") === "true") {
        return
      }

      if(active === "O"){
        that.attr("data-played", "O")
        that.children("span:nth-child(2)").css("display", "inline-block")
        that.closest(".container").data("active", "X");
      } else {
        that.attr("data-played", "X")
        that.children("span:nth-child(1)").css("display", "inline-block")
        that.closest(".container").data("active", "O");
      }
      
      checkInAnyoneWon(board);
    }
  }
  
  function clearBoard(board) {
   $(board).css("opacity", "1")
   $(board).find(".tile").removeAttr("data-played")
   $(board).find(".tile > span").css("display", "none")
   $(board).attr("data-done", "false")
  }
  
  function checkInAnyoneWon(board){
    let checkoutBoard = $("#board"+board);
    
    let arr = checkoutBoard.find(".tile").toArray();
    let results = arr.map(function(item){
      return $(item).attr("data-played");
    })
    let winner = checkForThreeInARow(results)
    if (winner[0]) {
      checkoutBoard.css("opacity", "0.5").attr("data-done", "true");
      checkoutBoard.find(".boardResults").text(`${winner[1]} is the winner!`)
    }
    
  }
  function checkForThreeInARow(results){
    let returnVal = false,
    winningValue;
    if((results[0] && results[1] && results[2]) && (results[0] === results[1] && results[1] === results[2])){
      winningValue = results[0];
      returnVal = true;
    } else if ((results[3] && results[4] && results[5]) && (results[3] === results[4] && results[4] === results[5])){
      winningValue = results[3];
      returnVal = true;
    } else if ((results[6] && results[7] && results[8]) && (results[6] === results[7] && results[7] === results[8])){
      winningValue = results[6];
      returnVal = true;
    } else if((results[0] && results[3] && results[6]) && (results[0] === results[3] && results[3] === results[6])){
      winningValue = results[0];
      returnVal = true;
    } else if ((results[1] && results[4] && results[7]) && (results[1] === results[7] && results[7] === results[1])){
      winningValue = results[3];
      returnVal = true;
    } else if ((results[2] && results[5] && results[8]) && (results[2] === results[5] && results[5] === results[8])){
      winningValue = results[2];
      returnVal = true;
    } else if((results[0] && results[2] && results[6]) && (results[0] === results[3] && results[3] === results[6])){
      winningValue = results[0];
      returnVal = true;
    } else if ((results[1] && results[4] && results[7]) && (results[1] === results[7] && results[7] === results[1])){
      winningValue = results[3];
      returnVal = true;
    } else if ((results[2] && results[5] && results[8]) && (results[2] === results[5] && results[5] === results[8])){
      winningValue = results[2];
      returnVal = true;
    }
    return [returnVal, winningValue]
  }
  
})