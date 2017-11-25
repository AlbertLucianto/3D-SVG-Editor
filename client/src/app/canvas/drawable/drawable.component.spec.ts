import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawableComponent } from './drawable.component';

describe('DrawableComponent', () => {
	let component: DrawableComponent;
	let fixture: ComponentFixture<DrawableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DrawableComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DrawableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
