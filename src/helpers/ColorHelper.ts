/**
 * Created by saso on 1/17/17.
 */
export class ColorHelper {

    public static MATERIAL_COLORS: Array<string> = [
        "#F44336",
        "#607D8B",
        "#9E9E9E",
        "#2196F3",
        "#4CAF50",
        "#2196F3",
        "#FFEB3B",
        "#FF9800",
        "#795548",
        "#3F51B5",
        "#2196F3"
    ];

    public static getRandomColor() {
        let randomIndex = Math.floor((Math.random() * ColorHelper.MATERIAL_COLORS.length - 1));
        console.log(ColorHelper.MATERIAL_COLORS[randomIndex]);
    }
}
