import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothAnchorComponent } from './smooth.component';

describe('SmoothAnchorComponent', () => {
	let component: SmoothAnchorComponent;
	let fixture: ComponentFixture<SmoothAnchorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SmoothAnchorComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SmoothAnchorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
