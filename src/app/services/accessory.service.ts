import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {HttpMethod, HttpService} from './base/http.service';
import {environment} from '../../environments/environment';
import {BaseService} from './base/base-service';

@Injectable({
    providedIn: 'root'
})
export class AccessoryService extends BaseService {

    basePath = 'accessory';

    constructor(
        httpService: HttpService
    ) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    getAllStructured(cb) {
        this.getAll(results => {
            results = results.reduce((r, a) => {
                a = this.setImgUrls(a);
                r[a.mainCategory] = r[a.mainCategory] || {};
                r[a.mainCategory][a.subCategory] = (r[a.mainCategory][a.subCategory] || []);
                r[a.mainCategory][a.subCategory].push(a);
                return r;
            }, {});
            cb(results);
        });
    }

    update(accessory) {
        const request = {};
        request['id'] = accessory.id;
        request['name'] = accessory.name;
        request['price'] = accessory.price;
        request['mainCategory'] = accessory.mainCategory;
        request['subCategory'] = accessory.subCategory;
        request['colors'] = JSON.stringify(accessory.colors);
        request['scale'] = accessory.scale;

        this.put(request);
    }

    updateColors(accessory) {
        const request = {};
        request['id'] = accessory.id;
        request['colors'] = JSON.stringify(accessory.colors);
        this.put(request);
    }

    setImgUrls(accessory) {
        const basePath = environment.baseAccessoryImgUrl + accessory.mainCategory.toLowerCase() + '/' + accessory.subCategory.toLowerCase() + '/' + accessory.name.toLowerCase() + '/';
        accessory.src = basePath + accessory.name.toLowerCase() + '.png';
        accessory.angles = [];
        for (let i = 0; i < 8; i ++) {
            accessory.angles.push(basePath + accessory.name.toLowerCase() + '_' + i + '.png');
        }
        return accessory;
    }

    setPropertyDefaults(modelId, accessory) {
        accessory.scale = accessory.scale || 1;
        accessory.location = 0;
        if ( accessory.colors ) {
            try {
                accessory.colors = JSON.parse(accessory.colors);
            } catch (e) {
                console.warn(e);
            }
        } else {
            accessory.colors = {
                'original': {
                    'hue': 0,
                    'saturate': 100,
                    'contrast': 100,
                    'brightness': 1,
                    'grayscale': 0,
                    'sepia': 0,
                },
            };
        }
        accessory.currentColor = Object.keys(accessory.colors)[0];

        if ( (accessory.properties == null || !accessory.properties.props || !accessory.properties.props[accessory.cma]) ) {
            accessory.properties = {
                'modelId': modelId,
                'accessoryId': accessory.id,
                'props': {}
            };
            accessory.properties.props[accessory.cma] = {0: {}};
            for (let i = 0; i < 10; i ++) {
                accessory.properties.props[accessory.cma][accessory.location][i] = {
                    'disabled': false,
                    'rotate': 0,
                    'angle': 0,
                    'x': 350,
                    'y': 300,
                    // 'coords': 'translate3d(0px, 0px, 0px);'
                };
            }
        } else if ( !accessory.properties.props[accessory.cma] ) {
            const sides = [];
            for (const side of accessory.properties.props) {
                sides.push(side);
            }
            accessory.cma = sides[0];
            Swal.fire({
                title: 'Info',
                text: 'This accessory only can add to this sides: ' + sides.toString()
            });
        }

        return accessory;
    }
}
