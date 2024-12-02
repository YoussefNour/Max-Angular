import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  options = ["Stable", "Critical", "Finished"];
  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        Validators.required,
        this.asyncProjectNameValidator
      ),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Critical"),
    });
  }

  projectNameValidator(control: FormControl): { [key: string]: boolean } {
    if (control.value === "Test") {
      return { valueTestNotAllowed: true };
    }
  }

  asyncProjectNameValidator(
    control: FormControl
  ): Promise<{ [key: string]: boolean }> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ valueTestNotAllowed: true });
        }
        resolve(null);
      }, 5000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
