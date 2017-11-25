import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BezierAnchorComponent } from './bezier.component';

describe('BezierAnchorComponent', () => {
	let component: BezierAnchorComponent;
	let fixture: ComponentFixture<BezierAnchorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BezierAnchorComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BezierAnchorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
