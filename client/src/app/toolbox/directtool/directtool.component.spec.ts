import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectSelectiontoolComponent } from './directtool.component';

describe('DirectSelectiontoolComponent', () => {
	let component: DirectSelectiontoolComponent;
	let fixture: ComponentFixture<DirectSelectiontoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DirectSelectiontoolComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DirectSelectiontoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
