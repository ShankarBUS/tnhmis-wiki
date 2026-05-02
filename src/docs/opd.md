OPD Module deals with out-patient precription and electronic medical records.

# Overview
![OPD Module](/src/assets/images/opd-module.png)

Among the 3 listed services:
- **OPD Desk New** (Recommended): provides a fast & redesigned UI for out-patient prescription.
- **EMR Desk**: all the past visits, vitals, diagnoses, treatments, hospital stays, investigations of a patient can viewed through Electronic Medical Record (EMR) Desk.
- **OPD Doctor Desk**: the deprecated & sluggish old UI.

# New OPD
The new OPD desk is the faster and cleaner version with comparatively good UI.

![New OPD Desk](/src/assets/images/opd-new.png)

The patients once registered will be listed under **"Patients Waiting"** under a certain department and OP Room. Once prescribed the patients will be marked attended and moved under **"Patients Attended"**.

Patients who are not registered and listed, but come directly to the OPD with a PIN can still be marked and prescribed directly from the new desk using the **"Mark Visit"** text box.

![Patient List](/src/assets/images/opd-new-list.png)

## Actions
Under Actions there are three buttons:
1. **Rx Prescription**: opens the prescription page.
2. **Vitals/GE**: opens the vitals entry dialog.
    > Always ensure the **green check** which indicates vitals have been entered.
3. **Other actions**: Opens a popup for marking patients as *Not Reported* or change them to another room.
    ![Other Actions](/src/assets/images/opd-actions.png)

## Rx Prescription

![Rx Prescription page](/src/assets/images/rx.png)

The Rx page displays the patient details at the top such as Name, Age/Sex, Phone Number, their PIN number