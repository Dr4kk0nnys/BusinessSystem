1 - How it is going to work:

    # - It will keep count on the sells of your store
        -> You sold 1 package of carrots for $ 1.59 at 04/21/2020 09:21 am
        -> You bought 30 kg of potatos for $ 33.21 at 04/23/2020 06:30 pm
    
    # - It will be very usefull since most stores need a system to keep count of their sells/buys
    # - Imagine you have to write down in a notebook every single thing you bought or sold, it is not easy ...

2 - Which tools it is going to use:
    
    # - Code: It will be written in Javascript ( nodejs )
    # - Database: It will use mysql as the database
    # - OOP: It will of course use object-oriented-programming
    # - APIS: Not sure yet ...

3 - Developer ideas:

    # - It will be made for terminal at first ( but i have some cool ideas to make a gui for it )
    # - It will start at the start of the day and finish it only once the shift is over
    # - It will start like this:

        Monday 21st, march, 2020  05:43:52 am           - Start shift
        
        [ 1 ] - Add order
        [ 2 ] - Change order
        [ 3 ] - Delete order
        [ 4 ] - Check order

    --> Note:
        . Every store has it's own way to add orders:
            . At Blue, you need: The name of the client, the cpf ... ( basic info ), the item the client is letting ( desktop or notebook ), if it's with any cables ...
        . But at a bakery house, why the fuck would you need to add if the client had any cables with it's order ??????

        - You need to make some small changes to every type of store ( info stores, bakery houses ... )

        - You won't need cpf for the bakery house, for example ...
