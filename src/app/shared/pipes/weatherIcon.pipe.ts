import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {
    transform(weathercode: number): string {  
        if (!weathercode) {
            return "bx bxs-happy-beaming";
        }      
        else if (weathercode < 10) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 10 && weathercode < 20) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 20 && weathercode < 30) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 30 && weathercode < 40) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 40 && weathercode < 50) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 50 && weathercode < 60) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 60 && weathercode < 70) {
            return "bx bxs-happy-beaming";
        }
        else if (weathercode > 70 && weathercode < 80) {
            return "bx bxs-happy-beaming";
        }
        return "bx bxs-happy-beaming";
    }
}