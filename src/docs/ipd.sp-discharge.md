# Overview

Single Page Discharge allows generating digital discharge summaries which can then be printed and distributed to the patient or stored online for further reference.

> [!NOTE]
> It is advised to [create a draft of the discharge summary and save it](#/ipd.sp-discharge?h=saving) few days prior to the discharge to prevent last minute rush.

![Discharge Desk](/src/assets/images/ipd-sp-discharge.png)

# Status

Patient status might be one of the following:
1. **Admitted** with yellow *"Prepare Discharge Summary"* action:  
This means that the patient is in admission and discharge has not been prepared yet.  
![Admitted, summary not prepared](/src/assets/images/ipd-sp-discharge-ad.png)  
2. **Discharged** with yellow *"Prepare Discharge Summary"* action:  
This means that the patient has been discharged and discharge has not been prepared yet.  
![Discharged, summary not prepared](/src/assets/images/ipd-sp-discharge-d.png)
> [!NOTE]
> There is a 24 hour time period to finish the summary after discharge has been taken. After which summary can't be prepared.  
3. **Discharge Request Generated** with 3 action buttons (*Modify Discharge Summary, View Discharge Summary and Print Discharge Summary)*:  
This means that the summary has been prepared and a discharge request has been raised. Once *Final Discharge* has been taken, patient can be discharged with the summary.  
![Discharge request generated](/src/assets/images/ipd-sp-discharge-dg.png)
4. **Discharged** with 3 action buttons:  
This means that the summary has been prepared and patient has been discharged.  
![Discharged, summary prepared](/src/assets/images/ipd-sp-discharge-ddg.png)

Make sure all the patient getting admitted are discharged with a digital discharge summary. Which will be ensure record availability in the future.

# Summary Preparation

![Generator overview](/src/assets/images/ipd-sp-discharge-gen-1.png)

The summary generator interface is still in development. Templates could be customized but very limited support is available. So every text including history, examination, course, etc., have to be typed manually. Currently, only suitable for a simple discharge summary.

**Advantages**: over other softwares such as Word
- *Investigations* are fetched automatically from the database.
- *Advice on Discharge* actually uploads the prescribed durgs to pharmacy. 

**Disadvantages**:
- All the histories, examination has to be entered manually as plain text.
- Not much support for templates or pre-filled values.
- Investigations take up many pages and are not visually good looking. Only HMIS reports are included. No support for including other investigation reports.
- No options to include **procedure done** or **operative notes**, **treatment details**, **opinions obtained**, **course during hospital stay**, **condition on admission or discharge**.

## Steps

### Diagnosis and Chief Complaints

![Diagnosis and chief complaints entry fields](/src/assets/images/ipd-sp-discharge-gen-2.png)

- **Diagnosis is mandatory** and should be entered in all summaries.
- Chief complaints and History of presenting illness can be typed out as plain text in simple terms. Atleast **positive histories** should be entered for future reference.

### Histories

![Rest of the histories dialog](/src/assets/images/ipd-sp-discharge-gen-3.png)

Other histories can be entered as plain text in the dialog. It is a tedious process to enter all the fields. At least include useful histories.

### Examination

![Examination findings dialog](/src/assets/images/ipd-sp-discharge-gen-4.png)

Similar to histories. Include positive findings at least.

### Investigations

![Investigation reports automatically pulled from database](/src/assets/images/ipd-sp-discharge-gen-5.png)

All the investigations reported for the patient will be fetched automatically and included in the summary.

> [!NOTE]
> Only Laboratory investigations reported through HMIS are fetched i.e. Path/Micro/BioChem. Other investigations can't be included at present. Radiology reporting is being rolled out eventually.

### Advice on Discharge

![Drug prescription](/src/assets/images/ipd-sp-discharge-gen-6.png)

Drug prescription is the same as in [OPD Module](#/opd.rx?h=drug-entry).

### Discharge Details and Follow Up Advice

![Discharge details and follow up advice](/src/assets/images/ipd-sp-discharge-gen-7.png)

Make sure to set the following fields at least:
- Discharge Type
- Discharge Prepared By
- Follow Up Date

### Saving

The generator autosaves data every 5 minutes, preventing data loss.

After validating all the data entered, click the **"Save"** button (present on top and floating on side as well).

![Saving the summary](/src/assets/images/ipd-sp-discharge-gen-8.png)

After clicking save, you will be prompted with this dialog:  
![Data Saved, Proceed to Prepare Summary](/src/assets/images/ipd-sp-discharge-save.png)

> [!NOTE]
> If you need to save only a draft few days prior the discharge, click "No" to prevent summary finalization.  
> Finalization can be done on the day of discharge.

### Approval

To finalize the summary, generate a PDF and prescribe the drugs, the summary needs to be approved.

![Approving the summary](/src/assets/images/ipd-sp-discharge-gen-9.png)

It can be done by clicking these buttons or clicking **"Yes, I am sure!"** button in the previous popup.

Then a preview dialog will display the summary.

![Summary preview](/src/assets/images/ipd-sp-discharge-approve.png)

Finish the summary by clicking **"Prepare & Approve"**.

You can safely close all the dialog once the PDF is displayed on screen, indicating completion.

# Suggestions to C-DAC Developers

<details>
    <summary><a href="https://shankarbus.github.io/dischargen" target="_blank">Dischargen - The Discharge Summary Generator</a></summary>
    <p>Features:</p>    
    <ul>
        <li>A template engine for parsing and rendering templates with support for:
            <ul>
                <li>Custom layouting (sections, groups with various orientation)</li>
                <li>Conditional rendering</li>
                <li>Variables with support for template overrides and suggestions</li>
                <li>Essential input and computed fields</li>
                <li>Template embedding with support</li>
            </ul>
        </li>
        <li>PDF and JSON export.</li>
        <li>Dark Theme support.</li>
        <li>Data Editor.</li>
        <li>PDF Metadata customization.</li>
        <li>Templates can have suggestions for quick fill.</li>
        <li>Work In Progress: Examination Input and History Builder UI which reduces the need for typing everything manually, as default values can come from the selected templates. Just a few clicks and be done.</li>
        <li>Better Prescription UI: ability to edit the prescription any time in place with proper <code>Tab</code> navigation support.</li>
        <li>The template engine can not only be used for discharge summaries but also daily notes, OPD notes, etc.</li>
    </ul>
</details>
