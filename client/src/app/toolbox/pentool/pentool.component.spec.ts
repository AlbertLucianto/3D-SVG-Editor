import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentoolComponent } from './pentool.component';

describe('PentoolComponent', () => {
	let component: PentoolComponent;
	let fixture: ComponentFixture<PentoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PentoolComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PentoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
