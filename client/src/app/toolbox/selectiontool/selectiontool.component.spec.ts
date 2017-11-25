import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiontoolComponent } from './selectiontool.component';

describe('SelectiontoolComponent', () => {
	let component: SelectiontoolComponent;
	let fixture: ComponentFixture<SelectiontoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SelectiontoolComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectiontoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
