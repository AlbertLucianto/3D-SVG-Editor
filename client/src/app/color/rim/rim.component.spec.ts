import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RimComponent } from './rim.component';

describe('RimComponent', () => {
	let component: RimComponent;
	let fixture: ComponentFixture<RimComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RimComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RimComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
