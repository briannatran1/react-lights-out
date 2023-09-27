- APP
    - Props: None
    - State: none

- Lights Out (Handles Logic)
    - Props:
            array of tiles,
            flip()

    - State: tiles

    - Event: flip(), checkForWin()

    Return:
    <GameBoard tiles={tiles} />

- Game Board (Presentation)
    - Props:
            tiles: [{
                    color: string,
                    index: num
                    }]
            flip()
    - State: None
    - Event: flip()

- Tile
    - Prop: color:string, flip()
    - State: None
    - Event: flip()