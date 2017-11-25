import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-invisible',
	templateUrl: './invisible.component.html',
	styleUrls: ['./invisible.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class InvisibleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
