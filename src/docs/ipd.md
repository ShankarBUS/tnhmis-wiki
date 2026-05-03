# Overview

IPD Module is still in development. Not all features are expected to work at this stage. Thus, incomplete features will be left out of this wiki till further improvements.

![IPD Module](/src/assets/images/ipd-module.png)

- **IPD Doctors Desk**: In-patients management.
- **Single Page Discharge**: Digital discharge summary generator

# IPD Doctors Desk

These components are neither mobile friendly user interface nor responsive. Thus, a desktop environment is recommended.

## Patient List

![IPD Doctors Desk](/src/assets/images/ipd-doctors-desk.png)

In-Patients are listed based on the *department mapped* to the doctor's account. Patients can be sorted by wards or rooms.  
A search is also provided for searching by *PIN or IP Number or Patient's Name*.

Clicking on an entry opens up the **Patient Dashboard**

## Patient Dashboard

These features are still work in progress and are not in implementation. So they will not be covered in detail.

![IPD Patient Dashboard](/src/assets/images/ipd-doctors-desk-pt-db.png)

A quick overview of the patient such as demographic details, admission summary, diagnosis, allergies, investigations and treatment are displayed.

- *Left Pane*:
    - *Doctor Call Acknowledge*: all call overs are displayed.
    - *Consultation Inbox*: consultation requests sent to the doctors are displayed.
    - *Doctor Notes*: visit, progress notes and instructions can be typed out as plain text.
    - *Diagnosis*: diagnosis can be modified further.
    - *History*: all necessary history can be typed out as plain text.
    - *Vital Monitoring*.
    - *Examination*: detailed examination findings can be typed out as plain text.
    - *Treatment Detail*: drugs can be prescribed for in-patients.
    - *Investigation Order*: lab or radiological investigation requisition can be raised.
- *Right Pane*:
    - *EMR*.
    - *E Consultation*: consultation request for the patient can be sent to a particular doctor.
    - *Investigation Tracker*: track investigation status whether pending or reported.
    - *View Investigation*: view investigation reports.
    - *Patient Chronic Disease*.
    - *Patient Allergies*.
    - *Discharge Request*.

# Single Page Discharge

A digital discharge summary generator for generating printable PDFs that can be given to the patient offline and persist online for future access.

![Discharge Desk](/src/assets/images/ipd-sp-discharge.png)

For a detailed breakdown, visit [Single Page Discharge](#/ipd.sp-discharge) page.