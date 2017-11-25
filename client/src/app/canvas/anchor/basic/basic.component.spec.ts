import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAnchorComponent } from './basic.component';

describe('BasicAnchorComponent', () => {
	let component: BasicAnchorComponent;
	let fixture: ComponentFixture<BasicAnchorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BasicAnchorComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BasicAnchorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
