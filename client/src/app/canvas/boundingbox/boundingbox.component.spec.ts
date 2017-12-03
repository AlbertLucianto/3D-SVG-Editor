import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundingBoxComponent } from './boundingbox.component';

describe('BoundingBoxComponent', () => {
	let component: BoundingBoxComponent;
	let fixture: ComponentFixture<BoundingBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BoundingBoxComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BoundingBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
