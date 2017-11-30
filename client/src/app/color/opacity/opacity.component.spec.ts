import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpacityComponent } from './opacity.component';

describe('OpacityComponent', () => {
	let component: OpacityComponent;
	let fixture: ComponentFixture<OpacityComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OpacityComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OpacityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
