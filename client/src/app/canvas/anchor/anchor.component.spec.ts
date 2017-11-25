import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorComponent } from './anchor.component';

describe('AnchorComponent', () => {
	let component: AnchorComponent;
	let fixture: ComponentFixture<AnchorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AnchorComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AnchorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
