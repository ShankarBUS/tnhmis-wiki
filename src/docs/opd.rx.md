# Overview

Rx Prescription pages handles OPD Visits and allows Doctors to document complaints, enter diagnosis, order laboratory or radiological investigations and precribe drugs all in one place.

![Rx Prescription Page](/src/assets/images/opd-new-rx.png)

## Patient Demographic Details

Basic demographic details such as name, age, sex, phone number and PIN are displayed on top of the page. Address can viewed through **EMR** module.

## Bookmarks

Bookmarks are the real time savers. They cut down prescription time for routine cases drastically allowing us to focus more on eliciting history and examining the patient.

The current Rx can be added to bookmarks through **"Bookmark this Rx"** button next to **"Save"** button.

![Bookmark search box](/src/assets/images/opd-new-rx-bkmk.png)
![Bookmark manager dialog](/src/assets/images/opd-new-rx-mgbkmk.png)

## Vitals
Vitals can be entered in this page as well.

![Vitals entry dialog](/src/assets/images/vitals.png)

Mandatory fields such as weight, height, BP and pulse rate should be entered. Other fields are optional.

> [!IMPORTANT]
> Always make sure vitals are entered before prescribing.  

## Actions

![The main actions strip](/src/assets/images/opd-new-rx-strip.png)

This strip displays the previous visit, and several buttons:
- **EMR**: Opens the EMR Desk in a popup.
- **Save as draft Rx**: Saves the Rx as draft in the server so that the prescription can be completed later.
- **Save Rx**: Completes the presciption, pushes the drugs to pharmacy and raises investigation requisitions if ordered.
- **Bookmark this Rx**: Adds the current prescription and all the data entered as a bookmark to use later.

## Chief Complaints

![Chief complaints section](/src/assets/images/opd-new-rx-cc.png)

You can select complaints from a pre-defined list or type your own. This section is optional.
Detailed history can be included if needed.

## Diagnosis

![Diagnosis section](/src/assets/images/opd-new-rx-dx.png)

Diagnosis can be selected from **ICD-10** or **SNOMED-CT** databases or can be entered manually in **Other diagnosis**.

> [!IMPORTANT]
> Diagnosis is **mandatory** and should be entered in all prescriptions.
> It is advised to enter proper diagnosis instead of vague or colloquial terms. (e.g., URI instead of cough & cold, Myalgia instead of body pain, etc.)

## Investigations

![Laboratory and Radiological investigations](/src/assets/images/opd-new-rx-ix.png)

Lab and Radiological investigations can be ordered right from the OPD. Requisitions will be sent on the corresponding departments. Patient can be sent to the lab or radiology to get it done.

## Drug Entry

Drug entry is the core part of prescription. Performance of drug entry was drastically improved with the new OPD and could be faster with **bookmarks**.

![Drug entry fields](/src/assets/images/opd-new-rx-drugs.png)

> [!NOTE]
> All drugs forms such as tablets, capsules, syrups, creams/ointments/gels are listed here.
> Prescription should only be done through this. Avoid manual written prescription.

### Fields
- **Drug Name**: Name can be searched from a list of available drugs in the pharmacy. Drug codes can be used to search as well.
Quantities of each drug is shown as well. Out of stock drugs can't be prescribed.
- **Dosage**: Avoid using fractions use decimels instead. e.g., 0.5 instead of 1/2, 0.75 instead of 3/4.
- **Frequency**: You can select pre-defined ones or customize them according to your needs. e.g., 1-0-0-2.  
![Frequency editor text boxes](/src/assets/images/opd-new-rx-drug-freq.png)
- **Days/Quantity**: Once your enter days, quantity will be calculated automatically from the dosage, frequency and days. Quantity can be set manually as well.
- **Instructions**: Can be entered if needed.

Once satisified click **"Add"** to add the prescription or **"Clear"** to clear the fields.
For example:
![Example](/src/assets/images/opd-new-rx-drugs-eg.png)

You can also uncheck drugs to avoid them from being prescribed.

> [!TIP]
> In a desktop computer, the `Tab` key can be used to move forward to next fields and `Shift` + `Tab` to move backward.
> This saves time by not using the mouse to select the next box.

## Finishing

Before finishing the prescription, make sure to:
- Verify vitals are entered.
- Diagnoses are entered.
- All the drugs entered are in correct form, dosage, frequency and days.

Then click the **"Save Rx"** button at the top. 