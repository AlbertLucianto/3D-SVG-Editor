import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubicAnchorComponent } from './cubic.component';

describe('CubicAnchorComponent', () => {
	let component: CubicAnchorComponent;
	let fixture: ComponentFixture<CubicAnchorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CubicAnchorComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CubicAnchorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
