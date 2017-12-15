import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatetoolComponent } from './rotatetool.component';

describe('RotatetoolComponent', () => {
	let component: RotatetoolComponent;
	let fixture: ComponentFixture<RotatetoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RotatetoolComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RotatetoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
