import os

driver_names = [
    "Syed ishtaq",
    "Syed irfan razvi",
    "Syed asif razvi",
    "Syed nadeem razvi",
    "Mudasir hussain waza",
    "Sajid ali",
    "Manzoor kawa",
    "Zulifkar ali",
    "Syed zulfkar",
    "Danish ali mir",
    "Nisar ah zargar",
    "Nisar ah rather",
    "Sameer husain wani",
    "Imran ali pandth",
    "Shahnawaz ali",
    "Saleem hassan",
    "Shabir ah hajam",
    "Firdoous ali mir",
    "Ali mohmmad dar",
    "G m mir",
    "Zulfkar ali bhat",
    "Sajaad ali bhat",
    "Numan ali akhoon",
    "Ali abass",
    "Syed muzamil"
]

roles = [
    "Senior · Kashmir Valley", "Highway · Delhi route", "Mountain · Sonmarg/Zojila", 
    "Tempo · 17/20 seater", "Coach · Jammu corridor", "Sedan · City", 
    "Volvo Sleeper · Long haul", "Fortuner 4x4 · Off-road"
]
skills_list = [
    ['Urdu', 'Hindi', 'English', 'Kashmiri'],
    ['Hindi', 'English', 'Punjabi'],
    ['Urdu', 'Hindi', 'Kashmiri'],
    ['Hindi', 'Urdu', 'English'],
    ['Hindi', 'Dogri', 'Urdu'],
    ['Urdu', 'English'],
    ['Hindi', 'Punjabi', 'Urdu'],
    ['Urdu', 'English', 'Hindi']
]

drivers_js = "const DRIVERS = [\n"
for i, name in enumerate(driver_names):
    role = roles[i % len(roles)]
    skills = skills_list[i % len(skills_list)]
    skills_str = "['" + "', '".join(skills) + "']"
    ini = "".join([part[0].upper() for part in name.split()])
    if len(ini) > 2: ini = ini[:2]
    # format phone
    photo = f"uploads/drivers/face_{i:02d}.jpg"
    years = 8 + (i % 10)
    drivers_js += f"  {{ name: '{name}', role: '{role}', years: {years}, skills: {skills_str}, ini: '{ini}', dl: 'JK01-XXXX-20{i%20:02d}', phone: '+91 70067 XXXXX', photo: '{photo}' }},\n"
drivers_js += "];\n"

# read data.jsx
filepath = "data.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

import re
# replace const DRIVERS = [ ... ];
pattern = r"const DRIVERS = \[\s*.*?\s*\];"
new_content = re.sub(pattern, drivers_js, content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated data.jsx with 25 drivers.")
