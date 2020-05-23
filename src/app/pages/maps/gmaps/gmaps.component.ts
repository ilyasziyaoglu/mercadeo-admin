import {Component} from '@angular/core';

@Component({
    selector: 'ngx-gmaps',
    styleUrls: ['./gmaps.component.scss'],
    template: `
        <nb-card>
            <agm-map [latitude]="lat" [longitude]="lng">
                <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
            </agm-map>
        </nb-card>
    `,
})
export class GmapsComponent {

    lat = 51.678418;
    lng = 7.809007;
}
