namespace Charactereditor {
    export interface Accessoires {
        name: string;
        gewicht: number;

    }

    export interface Category {
        [key: string]: Accessoires[];

    }


    export let categoryArray: Category
        = {
        "accessoires": [
            { name: "Havels Ring", gewicht: 0.1 },
            { name: "Ring der Verteidigung", gewicht: 1 },
            { name: "Katzenring", gewicht: 0.1 }


        ]

    };
}