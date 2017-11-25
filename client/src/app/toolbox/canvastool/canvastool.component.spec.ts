import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvastoolComponent } from './canvastool.component';

describe('CanvastoolComponent', () => {
	let component: CanvastoolComponent;
	let fixture: ComponentFixture<CanvastoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CanvastoolComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CanvastoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
