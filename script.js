
        let rounds = 0;
        let playerscore = 0;
        let computerscore = 0;
        let buttons = document.querySelectorAll("button.player_choice");
        let resetButton = document.querySelector("button.reset");
        let round_results = document.querySelector("#round_results");
        let roundText = document.querySelector("#round_text");
        let winnerText=document.querySelector("#winner_text");
        let playerScoreText =document.querySelector("#player_score");
        let computerScoreText = document.querySelector("#computer_score");

        buttons.forEach(function(button) {
        button.addEventListener("click", (e) => {
            game(e.target.textContent);
            });
        });
        resetButton.addEventListener("click", (e) =>{
            rounds = 0;
            computerscore = 0;
            playerscore = 0;
            round_results.textContent = "Press the game buttons to play.";
            winnerText.textContent = "";
            roundText.textContent = "Round #0";
            resetButton.style.display = "none";
            playerScoreText.textContent = "0";
            computerScoreText.textContent = "0";
        });

        function convertSelection(selection){
            if(selection=="rock")
                return 0;
            else if(selection=="scissor")
                return 1;
            else 
                return 2;
        }
        function computerPlay(options){
            
            return options[Math.floor((Math.random() * options.length) + 1)-1];
        }
        function playRound(playerSelection, computerSelection) 
        {
            const endings = [[0,1,-1],[-1,0,1],[1,-1,0]];
            playernum = convertSelection(playerSelection);
            compnum = convertSelection(computerSelection);
            result = endings[playernum][compnum];
            return result;
        }
        function reportResult(score,computerSelection,playerSelection)
        {
            if(score==1)
                return "You win this round! "+playerSelection+" beats "+computerSelection;
            else if(score==0)
                return "This round is a tie! Both selected "+computerSelection;
            else
                return "You lose this round! "+computerSelection+" beats "+playerSelection;
        }
        function getPlayerSelection(options, round){
            let playerSelection = "";
            while (playerSelection == "")
                {
                    playerSelection = window.prompt("Round "+round+". Please select an option (rock, scissor or paper)", "Rock");
                    playerSelection = playerSelection.toLocaleLowerCase();
                    if (options.includes(playerSelection)==false)
                    {
                        window.alert("Selection invalid. Try again.");
                        playerSelection = "";
                    }
                }
            return playerSelection;
        }
        function capitalize(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        function game(playerSelection)
        {
            const options = ["rock","scissor","paper"];
            let winner = "";
            let computerSelection = "";
            
            let playerSelectionText = document.querySelector("#player_selection");
            let computerSelectionText = document.querySelector("#computer_selection");


            if (rounds < 5)
            {
                roundText.textContent="Round #"+(rounds+1).toString();
                playerSelection = playerSelection.toLocaleLowerCase();
                computerSelection = computerPlay(options);
                result = playRound(playerSelection, computerSelection);
                if(result==1)
                    playerscore++;
                else if(result == -1)
                    computerscore++;
                else{
                    playerscore++;
                    computerscore++;
                }
                computerSelection=capitalize(computerSelection);
                playerSelection=capitalize(playerSelection);

                playerSelectionText.textContent = playerSelection;
                computerSelectionText.textContent = computerSelection;

                round_results.textContent =reportResult(result, computerSelection,playerSelection);
                playerScoreText.textContent = playerscore.toString();
                computerScoreText.textContent = computerscore.toString();
                rounds++;
            }
            if (rounds == 5)
            {
                if (playerscore>computerscore)
                    winner = "You!";
                else if (computerscore>playerscore)
                    winner = "The computer!";
                else
                    winner = "None! It's a tie!";
                winnerText.textContent = "Ding ding ding! The winner is: " + winner;
                resetButton.style.display = "inline-block";
            }
        }