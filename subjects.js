const SUBJECTS = {
  math: {
    name: 'Mathematik', emoji: '🔢', color: '#00e5ff',
    topics: [
      {
        id: 'funktionen',
        name: 'Funktionen & Terme',
        intro: 'Eine Funktion ordnet jedem x-Wert (Definitionsmenge) genau einen y-Wert (Wertemenge) zu. Der Graph zeigt diese Zuordnung visuell. Wichtig: Jeder x-Wert darf nur einmal vorkommen!',
        details: [
          'Definitionsmenge D: alle erlaubten x-Werte',
          'Wertemenge W: alle möglichen y-Werte',
          'Schreibweise: f(x) = ... oder y = ...',
          'Nullstellen: f(x) = 0 → x = ?',
          'Bei Brüchen: Nenner ≠ 0!'
        ],
        quiz: [
          { q: 'Was ist eine Funktion?', opts: ['Jeder x-Wert hat genau einen y-Wert','Zwei x-Werte können gleich sein','y-Werte müssen alle verschieden sein','x und y sind immer gleich'], a: 0 },
          { q: 'f(x) = 2x + 1. Was ist f(3)?', opts: ['5', '6', '7', '8'], a: 2 },
          { q: 'Was ist die Nullstelle von f(x) = x - 4?', opts: ['x = -4', 'x = 4', 'x = 0', 'x = 2'], a: 1 },
          { q: 'Welche x-Werte sind aus der Definitionsmenge von f(x) = 1/x ausgeschlossen?', opts: ['x = 1', 'x = -1', 'x = 0', 'Keine'], a: 2 },
          { q: 'f(x) = x². Wie lautet der y-Wert für x = -3?', opts: ['-9', '9', '6', '-6'], a: 1 },
          { q: 'Welche Aussage beschreibt den Graphen von f(x) = 3 (konstante Funktion)?', opts: ['Ansteigende Gerade', 'Horizontale Gerade', 'Parabel', 'Fallende Gerade'], a: 1 },
        ],
        generator: function() {
          const a = Math.floor(Math.random()*5)+1;
          const b = Math.floor(Math.random()*10)-5;
          const x = Math.floor(Math.random()*6)+1;
          return { problem: `Berechne f(${x}) für f(x) = ${a}x + ${b}`, solution: a*x+b, hint: `Setze x = ${x} ein: ${a}·${x} + ${b}` };
        }
      },
      {
        id: 'lineare-funktionen',
        name: 'Lineare Funktionen',
        intro: 'Lineare Funktionen haben die Form y = mx + t. m ist die Steigung (wie steil?), t der y-Achsenabschnitt (wo schneidet sie die y-Achse?). Je größer |m|, desto steiler.',
        details: [
          'Steigung m = Δy/Δx = (y₂-y₁)/(x₂-x₁)',
          'y-Achsenabschnitt t: Punkt (0, t)',
          'Nullstelle: 0 = mx + t → x = -t/m',
          'Zwei Geraden parallel wenn m₁ = m₂',
          'Schnittpunkt: f(x) = g(x) lösen',
          'Steigung positiv → steigend, negativ → fallend'
        ],
        quiz: [
          { q: 'Was beschreibt die Steigung m einer linearen Funktion?', opts: ['Den y-Achsenabschnitt', 'Wie steil der Graph ist', 'Die Nullstelle', 'Den Ursprung'], a: 1 },
          { q: 'f(x) = 2x - 6. Was ist die Nullstelle?', opts: ['x = 6', 'x = 3', 'x = -3', 'x = -6'], a: 1 },
          { q: 'Welche Steigung hat f(x) = -3x + 2?', opts: ['2', '-2', '3', '-3'], a: 3 },
          { q: 'f(x) = 4x + 1 und g(x) = 4x - 5 — wie verhalten sich die Geraden?', opts: ['Schneiden sich', 'Sind parallel', 'Sind identisch', 'Sind senkrecht'], a: 1 },
          { q: 'Wo schneidet f(x) = x + 3 die y-Achse?', opts: ['(3,0)', '(0,3)', '(-3,0)', '(0,-3)'], a: 1 },
          { q: 'Die Steigung zwischen (1,2) und (3,8) ist:', opts: ['2', '3', '4', '6'], a: 1 },
        ],
        generator: function() {
          const m = Math.floor(Math.random()*6)-3 || 1;
          const t = Math.floor(Math.random()*10)-5;
          const x1 = Math.floor(Math.random()*4)+1;
          const tSign = t >= 0 ? `+ ${t}` : `- ${Math.abs(t)}`;
          return { problem: `Bestimme die Nullstelle von f(x) = ${m}x ${tSign}`, solution: -t/m, hint: `0 = ${m}x ${tSign} → x = ${-t}/${m}` };
        }
      },
      {
        id: 'bruchterme',
        name: 'Bruchterme & Bruchgleichungen',
        intro: 'Bruchterme sind Terme mit Variablen im Nenner. Wichtig: Nenner ≠ 0! Beim Vereinfachen (Kürzen) müssen gemeinsame Faktoren in Zähler UND Nenner stehen.',
        details: [
          'Kürzen: gemeinsame Faktoren eliminieren',
          'Erweitern: Zähler und Nenner mit dem gleichen Faktor multiplizieren',
          'Addition: gleicher Nenner nötig → Hauptnenner suchen',
          'Multiplikation: Zähler×Zähler / Nenner×Nenner',
          'Division: mit Kehrbruch multiplizieren',
          'Definitionsmenge: alle x-Werte, die Nenner ≠ 0 machen'
        ],
        quiz: [
          { q: 'Welche Zahl ist aus der Definitionsmenge von 1/(x-3) ausgeschlossen?', opts: ['x=0', 'x=1', 'x=3', 'x=-3'], a: 2 },
          { q: 'Vereinfache: 6x²/(3x)', opts: ['2x', '2x²', '3x', '6x'], a: 0 },
          { q: '(x+2)/(x²-4) — welcher Term lässt sich herauskürzen?', opts: ['x+2', 'x-2', 'x²', '2'], a: 0 },
          { q: 'Was ist 1/2 + 1/3?', opts: ['2/5', '5/6', '1/6', '3/5'], a: 1 },
          { q: 'Löse: x/2 = 5', opts: ['x=10', 'x=5/2', 'x=3', 'x=7'], a: 0 },
          { q: 'Potenzen: (x²)³ =', opts: ['x⁵', 'x⁶', 'x⁸', '3x²'], a: 1 },
        ],
        generator: function() {
          const a = Math.floor(Math.random()*5)+2;
          const b = Math.floor(Math.random()*8)+1;
          return { problem: `Löse die Bruchgleichung: x/${a} = ${b}`, solution: a*b, hint: `Beide Seiten mit ${a} multiplizieren: x = ${a}·${b}` };
        }
      },
      {
        id: 'laplace',
        name: 'Laplace-Wahrscheinlichkeit',
        intro: 'Laplace-Experimente: Alle Ergebnisse sind gleich wahrscheinlich (z.B. fairer Würfel, Münze). Formel: P(A) = günstige Ergebnisse / alle Ergebnisse.',
        details: [
          'P(A) = |A| / |Ω| (günstig / gesamt)',
          'P liegt immer zwischen 0 und 1',
          'Gegenereignis: P(Ā) = 1 - P(A)',
          'Baumdiagramm: Pfadregeln anwenden',
          '1. Pfadregel: P(A∩B) = P(A) · P(B)',
          '2. Pfadregel: P(A∪B) = Summe der Pfadwahrscheinlichkeiten'
        ],
        quiz: [
          { q: 'Ein Würfel. P(gerade Zahl) = ?', opts: ['1/6', '1/3', '1/2', '2/3'], a: 2 },
          { q: 'P(A) = 0.3. P(Gegenereignis) = ?', opts: ['0.3', '0.6', '0.7', '1.3'], a: 2 },
          { q: 'In einer Urne: 3 rote, 2 blaue Kugeln. P(rot) = ?', opts: ['2/5', '3/5', '1/3', '3/2'], a: 1 },
          { q: 'Zwei Münzen. P(beide Kopf) = ?', opts: ['1/2', '1/4', '1/3', '3/4'], a: 1 },
          { q: 'Ein Ereignis ist unmöglich. P = ?', opts: ['1', '0.5', '0', '-1'], a: 2 },
          { q: 'Ein Ereignis ist sicher. P = ?', opts: ['0', '0.5', '0.9', '1'], a: 3 },
        ],
        generator: function() {
          const total = Math.floor(Math.random()*6)+5;
          const fav = Math.floor(Math.random()*(total-1))+1;
          return { problem: `In einer Urne sind ${total} Kugeln, davon ${fav} rote. P(rot) als Bruch?`, solution: `${fav}/${total}`, hint: `P = günstige/gesamt = ${fav}/${total}` };
        }
      },
      {
        id: 'lgs',
        name: 'Lineare Gleichungssysteme',
        intro: 'Ein LGS hat zwei (oder mehr) Gleichungen mit zwei Unbekannten. Lösung = der Schnittpunkt beider Geraden. Lösungsverfahren: Gleichsetzung, Einsetzung, Addition.',
        details: [
          'Einsetzungsverfahren: eine Variable aus einer Gleichung isolieren, in andere einsetzen',
          'Gleichsetzungsverfahren: beide Gleichungen nach gleicher Var. umformen, gleichsetzen',
          'Additionsverfahren: Gleichungen addieren, sodass eine Variable wegfällt',
          'Kein Schnittpunkt (parallel) → keine Lösung',
          'Unendlich viele Lösungen (identisch) → ganze Gerade',
          'Probe: gefundene Werte in beide Gleichungen einsetzen!'
        ],
        quiz: [
          { q: 'Wie viele Lösungen hat ein LGS mit parallelen Geraden?', opts: ['Genau eine', 'Zwei', 'Keine', 'Unendlich viele'], a: 2 },
          { q: 'x + y = 5 und x - y = 1. Was ist x?', opts: ['2', '3', '4', '5'], a: 1 },
          { q: 'Beim Additionsverfahren: Was ist das Ziel?', opts: ['Beide Gleichungen gleich machen', 'Eine Variable eliminieren', 'x und y addieren', 'Geradensteigung finden'], a: 1 },
          { q: 'Probe für LGS-Lösung bedeutet:', opts: ['x berechnen', 'Werte in beide Gleichungen einsetzen', 'y-Achsenabschnitt bestimmen', 'Graphen zeichnen'], a: 1 },
          { q: '2x + y = 7 und y = 3. Was ist x?', opts: ['1', '2', '3', '4'], a: 1 },
          { q: 'Identische Gleichungen in einem LGS haben:', opts: ['Keine Lösung', 'Genau eine Lösung', 'Unendlich viele Lösungen', 'Zwei Lösungen'], a: 2 },
        ],
        generator: function() {
          const x = Math.floor(Math.random()*5)+1;
          const y = Math.floor(Math.random()*5)+1;
          const a1=Math.floor(Math.random()*3)+1, b1=Math.floor(Math.random()*3)+1;
          const a2=Math.floor(Math.random()*3)+1, b2=Math.floor(Math.random()*3)+1;
          return {
            problem: `Löse: ${a1}x + ${b1}y = ${a1*x+b1*y} und ${a2}x - ${b2}y = ${a2*x-b2*y}`,
            solution: `x=${x}, y=${y}`,
            hint: `Lösung: x=${x}, y=${y}. Probe einsetzen!`
          };
        }
      }
    ]
  },

  bio: {
    name: 'Biologie', emoji: '🧬', color: '#39ff14',
    topics: [
      {
        id: 'nervensystem',
        name: 'Nervensystem & Sinne',
        intro: 'Das Nervensystem steuert alle Körperfunktionen. Nervenzellen (Neuronen) leiten elektrische Signale weiter. Das Auge wandelt Licht, das Ohr Schall in Nervenimpulse um.',
        details: [
          'Neuron: Zellkörper, Dendrit (empfängt), Axon (leitet weiter)',
          'Synapse: Verbindung zwischen Neuronen (Neurotransmitter)',
          'ZNS: Gehirn + Rückenmark | PNS: alle anderen Nerven',
          'Reflex: automatische, unwillkürliche Reaktion (z.B. Kniescheibenreflex)',
          'Auge: Hornhaut → Linse → Glaskörper → Netzhaut (Stäbchen/Zapfen)',
          'Ohr: Ohrmuschel → Trommelfell → Gehörknöchelchen → Schnecke → Hörnerv'
        ],
        quiz: [
          { q: 'Welcher Teil des Neurons empfängt Signale?', opts: ['Axon', 'Myelin', 'Dendrit', 'Synapse'], a: 2 },
          { q: 'Was ist ein Reflex?', opts: ['Willkürliche Handlung', 'Automatische, unwillkürliche Reaktion', 'Bewusste Entscheidung', 'Hormonelle Reaktion'], a: 1 },
          { q: 'Wo wird Licht auf der Netzhaut fokussiert?', opts: ['Hornhaut', 'Linse', 'Iris', 'Fovea centralis'], a: 3 },
          { q: 'Stäbchen in der Netzhaut sind zuständig für:', opts: ['Farbsehen', 'Sehen bei Dunkelheit', 'Scharfsehen', 'Nahsehen'], a: 1 },
          { q: 'Die Gehörknöchelchen heißen:', opts: ['Atlas, Axis, Dens', 'Hammer, Amboss, Steigbügel', 'Cochlea, Vestibulum, Canalis', 'Tympanum, Helix, Lobulus'], a: 1 },
          { q: 'ZNS besteht aus:', opts: ['Gehirn und Rückenmark', 'Allen Nerven des Körpers', 'Nur dem Großhirn', 'Sympathikus und Parasympathikus'], a: 0 },
        ]
      },
      {
        id: 'genetik',
        name: 'Genetik & Vererbung',
        intro: 'Die DNA (Desoxyribonukleinsäure) trägt alle Erbinformationen in Form von Basenpaaren. Gene sind Abschnitte der DNA. Gregor Mendel entdeckte die Grundregeln der Vererbung.',
        details: [
          'DNA: Doppelhelix aus Nukleotiden (A-T, G-C Basenpaare)',
          'Gen: Abschnitt der DNA → codiert ein Protein',
          'Chromosomen: kondensierte DNA (Mensch: 46 = 23 Paare)',
          'Mitose: Zellteilung für Wachstum (2n → 2n)',
          'Meiose: Keimzellbildung (2n → n, mit Rekombination)',
          'Mendel: Uniformitätsgesetz, Spaltungsgesetz (3:1), Unabhängigkeitsgesetz',
          'dominant: überdeckt rezessives Merkmal | rezessiv: wird überdeckt'
        ],
        quiz: [
          { q: 'Welche Basen paaren sich in der DNA?', opts: ['A-G und T-C', 'A-T und G-C', 'A-C und G-T', 'A-A und T-T'], a: 1 },
          { q: 'Wie viele Chromosomen hat ein menschlicher Körper?', opts: ['23', '46', '92', '48'], a: 1 },
          { q: 'Bei der Meiose entstehen:', opts: ['2 diploide Zellen', '4 haploide Keimzellen', '2 haploide Zellen', '4 diploide Zellen'], a: 1 },
          { q: 'Mendels Spaltungsgesetz ergibt ein Verhältnis von:', opts: ['1:1', '2:1', '3:1', '4:1'], a: 2 },
          { q: 'Ein dominantes Allel:', opts: ['Wird immer überdeckt', 'Ist immer homozygot', 'Überdeckt das rezessive Allel', 'Ist nur in Keimzellen aktiv'], a: 2 },
          { q: 'Was codiert ein Gen?', opts: ['Ein Chromosom', 'Ein Protein (oder RNA)', 'Eine Zelle', 'Ein Organ'], a: 1 },
        ]
      },
      {
        id: 'evolution',
        name: 'Evolution',
        intro: 'Charles Darwin entwickelte die Evolutionstheorie: Lebewesen verändern sich über viele Generationen durch natürliche Selektion. Nur die am besten angepassten überleben und vererben ihre Merkmale.',
        details: [
          'Variation: Individuen sind verschieden (Mutationen, Rekombination)',
          'Selektion: Umwelt "wählt" — Angepasste überleben besser',
          'Adaption: Anpassung an die Umgebung über Generationen',
          'Artbildung (Speziation): Isolation → unterschiedliche Selektion → neue Art',
          'Fossilien: versteinerte Überreste als Belege für Evolution',
          'Homologe Organe: gleiche Herkunft, verschiedene Funktion (z.B. Arm/Flosse)'
        ],
        quiz: [
          { q: 'Was ist natürliche Selektion?', opts: ['Züchtung durch Menschen', 'Überleben der Angepasstesten', 'Zufällige Mutation', 'Schnelles Wachstum'], a: 1 },
          { q: 'Was sind Fossilien?', opts: ['Lebende Lebewesen', 'Versteinerte Überreste vergangener Lebewesen', 'Genetische Mutationen', 'Klimazonen'], a: 1 },
          { q: 'Homologe Organe haben:', opts: ['Gleiche Funktion, verschiedene Herkunft', 'Gleiche Herkunft, verschiedene Funktion', 'Weder gleiche Funktion noch Herkunft', 'Identische Struktur und Funktion'], a: 1 },
          { q: 'Wer entwickelte die Evolutionstheorie?', opts: ['Mendel', 'Lamarck', 'Darwin', 'Watson'], a: 2 },
          { q: 'Artbildung entsteht hauptsächlich durch:', opts: ['Ernährung', 'Isolation und unterschiedliche Selektion', 'Klimawandel allein', 'Genetische Gleichheit'], a: 1 },
          { q: 'Variation in einer Population entsteht durch:', opts: ['Nur Selektion', 'Mutationen und Rekombination', 'Anpassung allein', 'Fossilien'], a: 1 },
        ]
      },
      {
        id: 'oekologie',
        name: 'Ökologie',
        intro: 'Ökologie untersucht die Beziehungen zwischen Lebewesen und ihrer Umwelt. Biotop = Lebensraum, Biozönose = Lebensgemeinschaft, Ökosystem = beides zusammen.',
        details: [
          'Biotop: unbelebter Lebensraum (Klima, Boden, Wasser)',
          'Biozönose: alle Lebewesen eines Biotops',
          'Ökosystem = Biotop + Biozönose',
          'Nahrungskette: Produzent → Konsument I → II → III → Destruent',
          'Nahrungsnetz: viele verknüpfte Nahrungsketten',
          'Stoffkreislauf: C, N, O werden recycelt',
          'Anthropogener Einfluss: Abholzung, Klimawandel, Artensterben'
        ],
        quiz: [
          { q: 'Was ist ein Ökosystem?', opts: ['Nur die Tiere eines Gebiets', 'Biotop + Biozönose', 'Nur die Pflanzen', 'Die Klimabedingungen'], a: 1 },
          { q: 'Produzenten in der Nahrungskette sind:', opts: ['Tiere', 'Pilze', 'Grüne Pflanzen', 'Bakterien'], a: 2 },
          { q: 'Was sind Destruenten?', opts: ['Raubtiere', 'Pflanzen', 'Abbauer (Bakterien, Pilze)', 'Konsumenten II'], a: 2 },
          { q: 'Ein Biotop ist:', opts: ['Eine Tierart', 'Der unbelebte Lebensraum', 'Eine Pflanzengattung', 'Ein Nahrungsnetz'], a: 1 },
          { q: 'Im Stoffkreislauf werden Elemente:', opts: ['Verbraucht und vernichtet', 'Immer neu gebildet', 'Recycelt und wiederverwendet', 'Ins All abgegeben'], a: 2 },
          { q: 'Was versteht man unter Biozönose?', opts: ['Den Lebensraum', 'Die Klimabedingungen', 'Alle Lebewesen eines Biotops', 'Nur die Produzenten'], a: 2 },
        ]
      }
    ]
  },

  chemie: {
    name: 'Chemie', emoji: '⚗️', color: '#ff8c00',
    topics: [
      {
        id: 'atombau',
        name: 'Atombau',
        intro: 'Atome bestehen aus Protonen (+) und Neutronen (neutral) im Kern und Elektronen (-) in der Hülle. Die Ordnungszahl gibt die Protonenzahl an und bestimmt das Element.',
        details: [
          'Proton: positiv geladen, im Kern',
          'Neutron: neutral, im Kern (Kernmasse)',
          'Elektron: negativ geladen, in Schalen um den Kern',
          'Ordnungszahl Z = Protonenzahl = Elektronenzahl (im neutralen Atom)',
          'Massenzahl A = Protonen + Neutronen',
          'Isotope: gleiche Z, verschiedene Neutronenzahl',
          'Bohrsches Schalenmodell: Elektronen auf festen Schalen (K,L,M,...)'
        ],
        quiz: [
          { q: 'Was bestimmt die Ordnungszahl eines Elements?', opts: ['Neutronenzahl', 'Protonenzahl', 'Elektronenzahl in der Hülle', 'Massenzahl'], a: 1 },
          { q: 'Isotope unterscheiden sich in der:', opts: ['Protonenzahl', 'Elektronenzahl', 'Neutronenzahl', 'Ordnungszahl'], a: 2 },
          { q: 'Massenzahl = ?', opts: ['Proton + Elektron', 'Neutron + Elektron', 'Proton + Neutron', 'Alle drei Teilchen'], a: 2 },
          { q: 'Elektronen haben eine ... Ladung:', opts: ['Positive', 'Neutrale', 'Negative', 'Wechselnde'], a: 2 },
          { q: 'Kohlenstoff hat die Ordnungszahl 6. Wie viele Protonen hat es?', opts: ['12', '6', '8', '14'], a: 1 },
          { q: 'Im Bohrschen Modell befinden sich Elektronen:', opts: ['Im Kern', 'Zufällig verteilt', 'Auf festen Schalen', 'Zwischen Protonen'], a: 2 },
        ]
      },
      {
        id: 'pse',
        name: 'Periodensystem (PSE)',
        intro: 'Das Periodensystem ordnet alle Elemente nach steigender Protonenzahl. Elemente einer Gruppe (Spalte) haben ähnliche Eigenschaften. Perioden (Zeilen) zeigen die Elektronenschalen.',
        details: [
          'Gruppen (Spalten): gleiche Valenzelektronenzahl → ähnliche Eigenschaften',
          'Perioden (Zeilen): gleiche Anzahl Elektronenschalen',
          'Metalle: links und unten, gut leitend, glänzend',
          'Nichtmetalle: rechts oben, schlechte Leiter',
          'Halbmetalle: dazwischen (Si, Ge, As...)',
          'Edelgase: Gruppe 18, sehr reaktionsträge (volle Außenschale)',
          'Alkalimeralle: Gruppe 1, sehr reaktiv'
        ],
        quiz: [
          { q: 'Was zeigt eine Periode im PSE?', opts: ['Gleiche Valenzelektronen', 'Gleiche Anzahl Schalen', 'Gleiche Masse', 'Gleiche Reaktivität'], a: 1 },
          { q: 'Edelgase stehen in Gruppe:', opts: ['1', '8', '17', '18'], a: 3 },
          { q: 'Metalle befinden sich im PSE:', opts: ['Rechts oben', 'Links und unten', 'Nur in Periode 2', 'Überall gleichmäßig'], a: 1 },
          { q: 'Elemente einer Gruppe haben:', opts: ['Gleiche Massenzahl', 'Gleiche Neutronenzahl', 'Gleiche Valenzelektronenzahl', 'Gleiche Isotope'], a: 2 },
          { q: 'Alkali-Metalle sind in Gruppe:', opts: ['1', '2', '17', '18'], a: 0 },
          { q: 'Silizium (Si) ist ein:', opts: ['Metall', 'Edelgas', 'Halbleiter/Halbmetall', 'Nichtmetall'], a: 2 },
        ]
      },
      {
        id: 'bindungen',
        name: 'Chemische Bindungen',
        intro: 'Atome verbinden sich durch Abgabe, Aufnahme oder gemeinsame Nutzung von Elektronen. Dabei streben sie die Edelgaskonfiguration an (volle Außenschale = Oktettregel).',
        details: [
          'Ionenbindung: Elektronenübertragung (Metall → Nichtmetall) → Ionen',
          'Kovalente Bindung (Elektronenpaarbindung): gemeinsame Elektronen, Nichtmetall+Nichtmetall',
          'Metallbindung: freie Elektronen im Gitter (Elektronengas)',
          'Oktettregel: Atome streben 8 Valenzelektronen an',
          'Polarität: verschiedene Elektronegativitäten → Dipol',
          'Wasserstoffbrücken: zwischen polaren Molekülen (z.B. Wasser)'
        ],
        quiz: [
          { q: 'Bei der Ionenbindung werden Elektronen:', opts: ['Geteilt', 'Übertragen', 'Zerstört', 'Verdoppelt'], a: 1 },
          { q: 'Kovalente Bindungen entstehen zwischen:', opts: ['Metall und Nichtmetall', 'Zwei Metallen', 'Zwei Nichtmetallen', 'Ionen'], a: 2 },
          { q: 'Was ist die Oktettregel?', opts: ['8 Protonen im Kern', 'Streben nach 8 Valenzelektronen', '8 Schalen', '8 Isotope'], a: 1 },
          { q: 'Die Metallbindung ist gekennzeichnet durch:', opts: ['Ionengitter', 'Gemeinsame Elektronen zweier Atome', 'Frei bewegliche Elektronen im Gitter', 'Kovalente Bindung'], a: 2 },
          { q: 'NaCl ist ein Beispiel für:', opts: ['Kovalente Bindung', 'Ionenbindung', 'Metallbindung', 'Wasserstoffbrücke'], a: 1 },
          { q: 'Wasserstoffbrücken entstehen zwischen:', opts: ['Ionen', 'Metallen', 'Polaren Molekülen', 'Edelgasen'], a: 2 },
        ]
      },
      {
        id: 'reaktionen',
        name: 'Chemische Reaktionen',
        intro: 'Bei chemischen Reaktionen entstehen neue Stoffe mit neuen Eigenschaften. Reaktionsgleichungen zeigen: Edukte (links) → Produkte (rechts). Masse bleibt erhalten!',
        details: [
          'Massenerhaltungssatz: Gesamtmasse bleibt konstant',
          'Oxidation: Abgabe von Elektronen (oder Aufnahme von Sauerstoff)',
          'Reduktion: Aufnahme von Elektronen (oder Abgabe von Sauerstoff)',
          'Redoxreaktion: Oxidation + Reduktion gleichzeitig',
          'Katalysator: senkt Aktivierungsenergie, wird nicht verbraucht',
          'Aktivierungsenergie: notwendige Energie zum Starten der Reaktion',
          'Exotherm: Energie wird freigesetzt | Endotherm: Energie wird benötigt'
        ],
        quiz: [
          { q: 'Was besagt der Massenerhaltungssatz?', opts: ['Masse nimmt zu', 'Masse nimmt ab', 'Masse bleibt konstant', 'Masse verdoppelt sich'], a: 2 },
          { q: 'Was ist Oxidation?', opts: ['Aufnahme von Elektronen', 'Abgabe von Elektronen', 'Aufnahme von Protonen', 'Kein Elektronentransfer'], a: 1 },
          { q: 'Ein Katalysator:', opts: ['Wird verbraucht', 'Erhöht die Aktivierungsenergie', 'Senkt die Aktivierungsenergie', 'Verändert das Produkt'], a: 2 },
          { q: 'Bei exothermen Reaktionen:', opts: ['Wird Energie benötigt', 'Wird Energie freigesetzt', 'Passiert kein Energieaustausch', 'Entstehen keine Produkte'], a: 1 },
          { q: 'Edukte in einer Reaktionsgleichung stehen:', opts: ['Rechts', 'Links', 'Über dem Pfeil', 'Unten'], a: 1 },
          { q: 'Reduktion ist:', opts: ['Elektronenabgabe', 'Elektronenaufnahme', 'Protonenverlust', 'Sauerstoffaufnahme'], a: 1 },
        ]
      }
    ]
  },

  deutsch: {
    name: 'Deutsch', emoji: '📚', color: '#ffd700',
    topics: [
      {
        id: 'grammatik',
        name: 'Grammatik: Satzglieder & Sätze',
        intro: 'Satzglieder sind die Bausteine eines Satzes. Das Subjekt (wer?), Prädikat (was tut?), Objekte (wen/wem/wessen?) und Adverbiale (wo/wann/wie?). Nebensätze ergänzen den Hauptsatz.',
        details: [
          'Subjekt: wer oder was? (Nominativ)',
          'Prädikat: das finite Verb (was tut das Subjekt?)',
          'Akkusativobjekt: wen oder was?',
          'Dativobjekt: wem?',
          'Adverbiale: Ort, Zeit, Art und Weise, Grund',
          'Nebensatztypen: Relativsatz, Konjunktionalsatz, Infinitivsatz',
          'Komma vor: weil, obwohl, dass, wenn, als, damit, obgleich...'
        ],
        quiz: [
          { q: 'Das Subjekt steht im:', opts: ['Akkusativ', 'Dativ', 'Nominativ', 'Genitiv'], a: 2 },
          { q: 'Welche Frage stellt man nach dem Akkusativobjekt?', opts: ['Wer?', 'Wem?', 'Wen oder was?', 'Wo?'], a: 2 },
          { q: 'Vor welcher Konjunktion steht ein Komma?', opts: ['und', 'oder', 'weil', 'aber... nein, aber auch'], a: 2 },
          { q: '"Er läuft schnell." — "schnell" ist ein:', opts: ['Subjekt', 'Objekt', 'Adverbiale', 'Prädikat'], a: 2 },
          { q: 'Ein Relativsatz beginnt mit:', opts: ['weil, da, damit', 'der, die, das (Relativpronomen)', 'und, aber, oder', 'wenn, als, falls'], a: 1 },
          { q: 'Das Prädikat ist:', opts: ['Das Hauptnomen', 'Das finite Verb (konjugiert)', 'Das Adjektiv', 'Der Artikel'], a: 1 },
        ]
      },
      {
        id: 'textproduktion',
        name: 'Schreiben: Erörterung & Analyse',
        intro: 'Eine Erörterung diskutiert ein Thema mit Pro- und Contra-Argumenten und kommt zu einem begründeten Schluss. Die Textanalyse untersucht Aufbau, Inhalt und sprachliche Mittel eines Textes.',
        details: [
          'Erörterung: Einleitung (These) → Argumente (These → Beleg → Erklärung) → Schluss',
          'Wichtig: Argument immer belegen und erklären (3-Schritt)',
          'Inhaltsangabe: Präsens, objektiv, keine Wertung, kein "wörtlich"',
          'Charakterisierung: direkte + indirekte Charakterisierung',
          'Textanalyse: Aufbau, Sprache, Stil, Figurengestaltung',
          'Stilmittel: Metapher, Personifikation, Vergleich, Anapher, Klimax'
        ],
        quiz: [
          { q: 'In welcher Zeitform schreibt man eine Inhaltsangabe?', opts: ['Vergangenheit', 'Futur', 'Präsens', 'Plusquamperfekt'], a: 2 },
          { q: 'Der 3-Schritt beim Erörtern ist:', opts: ['Einleitung-Hauptteil-Schluss', 'These-Beleg-Erklärung', 'Problem-Lösung-Fazit', 'Frage-Antwort-Begründung'], a: 1 },
          { q: 'Was ist eine Metapher?', opts: ['Wörtliche Beschreibung', 'Übertragener sprachlicher Vergleich ohne "wie"', 'Vergleich mit "wie"', 'Wiederholung am Satzanfang'], a: 1 },
          { q: 'Eine Anapher ist:', opts: ['Steigerung', 'Wortwiederholung am Satzanfang', 'Wortumstellung', 'Metapher'], a: 1 },
          { q: 'Bei der Charakterisierung unterscheidet man:', opts: ['Haupt- und Nebenfiguren', 'Direkte und indirekte Charakterisierung', 'Gut und böse', 'Jung und alt'], a: 1 },
          { q: 'Die Klimax ist:', opts: ['Abschwächung', 'Steigerung (schwach→stärker→am stärksten)', 'Vergleich', 'Wiederholung'], a: 1 },
        ]
      },
      {
        id: 'literatur',
        name: 'Literatur: Klassik & Faust',
        intro: 'Sturm und Drang (1770–85): Gefühl vor Verstand, Rebellion gegen Regeln. Weimarer Klassik (1786–1832): Harmonie, Humanität, Schiller und Goethe. Goethes Faust ist das Meisterwerk der deutschen Literatur.',
        details: [
          'Sturm und Drang: Gefühl, Natur, Individualismus (Goethe, Schiller früh)',
          'Weimarer Klassik: Humanität, Harmonie, Maß (Goethe, Schiller 1786-1805)',
          'Faust I: Fausts Pakt mit Mephisto, Gretchen-Tragödie',
          'Kernthema: Streben nach Wissen und Erfahrung vs. moralische Grenzen',
          'Ballade: erzählendes Gedicht mit Handlung, oft dramatisch (z.B. Erlkönig)',
          'Epochenmerkmale: Klassik = Antike als Vorbild, Ordnung, Formperfekt'
        ],
        quiz: [
          { q: 'Wann lebte Goethe (ungefähr)?', opts: ['1450–1520', '1649–1715', '1749–1832', '1850–1920'], a: 2 },
          { q: 'Was ist ein Leitmerkmal des Sturm und Drang?', opts: ['Kühle Vernunft', 'Gefühl und Leidenschaft', 'Formstrenge', 'Antike Götter'], a: 1 },
          { q: 'Faust schließt einen Pakt mit:', opts: ['Gretchen', 'Gott', 'Mephisto', 'Wagner'], a: 2 },
          { q: 'Die Weimarer Klassik betonte:', opts: ['Revolution und Aufstand', 'Chaos und Gefühl', 'Harmonie, Humanität, Maß', 'Mittelalterliche Ritter'], a: 2 },
          { q: 'Eine Ballade ist:', opts: ['Ein epischer Roman', 'Ein Drama in 5 Akten', 'Ein erzählendes Gedicht mit Handlung', 'Ein philosophisches Werk'], a: 2 },
          { q: 'Schiller und Goethe prägten die:', opts: ['Romantik', 'Weimarer Klassik', 'Aufklärung', 'Expressionismus'], a: 1 },
        ]
      },
      {
        id: 'rechtschreibung',
        name: 'Rechtschreibung & Kommaregeln',
        intro: 'Korrekte Rechtschreibung ist Grundlage jeder schriftlichen Kommunikation. Besonders wichtig: Groß-/Kleinschreibung, Dehnung/Schärfung, s/ss/ß und Kommaregeln.',
        details: [
          'Nomen groß, Verben/Adjektive klein (außer am Satzanfang)',
          'Nominalisierungen groß: "das Laufen", "beim Essen"',
          'Dehnungs-h: nach langen Vokalen (fahren, Bahn, stehlen)',
          'Doppelkonsonant nach kurzem Vokal (kann, lassen, Mutter)',
          'ss nach kurzem Vokal, ß nach langem Vokal/Diphthong (Straße, Fluss)',
          'Komma bei: Nebensätzen, Aufzählungen, Infinitivgruppen (oft)',
          'Kein Komma bei: "und", "oder" zwischen gleichwertigen Hauptsätzen (außer bei Einschüben)'
        ],
        quiz: [
          { q: 'Wann schreibt man ß statt ss?', opts: ['Nach kurzem Vokal', 'Nach langem Vokal oder Diphthong', 'Immer am Wortende', 'Nie in Substantiven'], a: 1 },
          { q: '"das Laufen" — warum Großschreibung?', opts: ['Es ist ein Eigenname', 'Es ist ein nominalisiertes Verb', 'Es steht am Satzanfang', 'Es ist ein Adjektiv'], a: 1 },
          { q: 'Komma vor "weil"?', opts: ['Nein, nie', 'Ja, immer', 'Nur bei langen Sätzen', 'Nur bei Verneinung'], a: 1 },
          { q: 'Welches Wort hat Dehnungs-h?', opts: ['Mutter', 'fahren', 'lassen', 'rennen'], a: 1 },
          { q: 'Wann steht kein Komma zwischen zwei Hauptsätzen?', opts: ['Immer', 'Bei "und" und "oder"', 'Bei "aber"', 'Bei "denn"'], a: 1 },
          { q: 'Doppelter Konsonant steht nach:', opts: ['Langem Vokal', 'Diphthong', 'Kurzem Vokal', 'h'], a: 2 },
        ]
      }
    ]
  },

  geschichte: {
    name: 'Geschichte', emoji: '🌍', color: '#b44fff',
    topics: [
      {
        id: 'revolution-1789',
        name: 'Aufklärung & Französische Revolution',
        intro: 'Die Aufklärung (18. Jh.) betonte Vernunft und Freiheit. Die Französische Revolution 1789 stürzte den Absolutismus. Freiheit, Gleichheit, Brüderlichkeit — die Welt veränderte sich für immer.',
        details: [
          'Aufklärung: Kant "Habe Mut, dich deines eigenen Verstandes zu bedienen!"',
          'Gewaltenteilung (Montesquieu): Legislative, Exekutive, Judikative',
          'Volkssouveränität (Rousseau): Macht kommt vom Volk',
          '14. Juli 1789: Sturm auf die Bastille (Symbol der Revolution)',
          'Menschen- und Bürgerrechte 1789: Freiheit, Gleichheit, Volkssouveränität',
          'Napoleon: Konsul 1799, Kaiser 1804, Europas Neuordnung, Völkerschlacht 1813',
          'Wiener Kongress 1814/15: Restauration der alten Ordnung'
        ],
        quiz: [
          { q: 'Wann war der Sturm auf die Bastille?', opts: ['1776', '1789', '1804', '1815'], a: 1 },
          { q: 'Die drei Prinzipien der Französischen Revolution waren:', opts: ['Gott-König-Vaterland', 'Freiheit-Gleichheit-Brüderlichkeit', 'Arbeit-Brot-Frieden', 'Macht-Ehre-Stärke'], a: 1 },
          { q: 'Gewaltenteilung bedeutet:', opts: ['Ein Herrscher hat alle Macht', 'Macht verteilt auf Legislative, Exekutive, Judikative', 'Das Volk regiert direkt', 'Die Kirche hat Macht'], a: 1 },
          { q: 'Napoleon wurde 1804:', opts: ['Präsident', 'König von Frankreich', 'Kaiser der Franzosen', 'Konsul'], a: 2 },
          { q: 'Der Wiener Kongress (1814/15) stand für:', opts: ['Demokratie', 'Restauration und alte Ordnung', 'Nationalismus', 'Industrialisierung'], a: 1 },
          { q: 'Wer formulierte das Prinzip der Volkssouveränität?', opts: ['Voltaire', 'Kant', 'Rousseau', 'Montesquieu'], a: 2 },
        ]
      },
      {
        id: 'restauration-1848',
        name: 'Restauration & Revolution 1848',
        intro: 'Nach Napoleon versuchten die Fürsten beim Wiener Kongress 1815, die alte Ordnung wiederherzustellen (Restauration). Doch Nationalismus und Liberalismus wuchsen — bis zur Revolution von 1848.',
        details: [
          'Wiener Kongress 1815: Metternich, Restauration, Heilige Allianz',
          'Vormärz (1815–1848): Zensur, Unterdrückung, wachsende Opposition',
          'Burschenschaften: Studenten kämpfen für Einheit und Freiheit',
          'März 1848: Revolution in ganz Europa',
          'Frankfurter Paulskirche: erstes deutsches Parlament',
          'Scheitern 1849: Preußen lehnt Kaiserkrone ab, Revolution niedergeschlagen',
          'Folge: Nationalstaatsgedanke wächst weiter'
        ],
        quiz: [
          { q: 'Was war der Vormärz?', opts: ['Zeit nach 1848', 'Zeit vor der Revolution 1848 (1815-1848)', 'Napoleons Herrschaft', 'Der Wiener Kongress'], a: 1 },
          { q: 'Die Frankfurter Paulskirche war:', opts: ['Eine Kirche in Frankfurt', 'Das erste deutsche Parlament 1848', 'Ein Gefängnis', 'Metternichs Residenz'], a: 1 },
          { q: 'Wer war die Schlüsselfigur des Wiener Kongresses?', opts: ['Napoleon', 'Bismarck', 'Metternich', 'Friedrich Wilhelm IV'], a: 2 },
          { q: 'Warum scheiterte die Revolution 1849?', opts: ['Es gab keine Revolution', 'Preußen lehnte Kaiserkrone ab, Militär siegte', 'Das Volk wollte keinen Wandel', 'Frankreich intervenierte'], a: 1 },
          { q: 'Burschenschaften setzten sich ein für:', opts: ['Den König', 'Einheit und Freiheit Deutschlands', 'Napoleon', 'Den Papst'], a: 1 },
          { q: 'Das Motto des Hambacher Fests (1832) lautete:', opts: ['Für König und Vaterland', 'Für Einheit und Freiheit', 'Für Gott und Kaiser', 'Für Arbeit und Brot'], a: 1 },
        ]
      },
      {
        id: 'industrialisierung',
        name: 'Industrialisierung',
        intro: 'Die Industrialisierung (ab ~1760 in England, ab ~1835 in Deutschland) veränderte Wirtschaft und Gesellschaft fundamental. Dampfmaschine, Eisenbahn, Fabriken — und eine neue soziale Frage.',
        details: [
          'Beginn: England ca. 1760, Deutschland ca. 1835',
          'James Watt: verbesserte Dampfmaschine (1769)',
          'Eisenbahn: erste deutsche Strecke Nürnberg–Fürth 1835',
          'Proletariat: Fabrikarbeiter ohne Eigentum, schlechte Bedingungen',
          'Soziale Frage: Armut, Kinderarbeit, 14h-Arbeitstage',
          'Karl Marx & Friedrich Engels: "Kommunistisches Manifest" 1848',
          'Arbeiterbewegung: Gewerkschaften, SPD (1875 gegründet)'
        ],
        quiz: [
          { q: 'Wo begann die Industrialisierung?', opts: ['Deutschland', 'Frankreich', 'England', 'USA'], a: 2 },
          { q: 'Erste deutsche Eisenbahnstrecke (1835):', opts: ['Berlin–Hamburg', 'München–Augsburg', 'Nürnberg–Fürth', 'Frankfurt–Köln'], a: 2 },
          { q: 'Was ist die "Soziale Frage"?', opts: ['Welche Religion ist richtig?', 'Armut und schlechte Arbeitsbedingungen der Fabrikarbeiter', 'Das Wahlrecht für Frauen', 'Die Schulpflicht'], a: 1 },
          { q: 'Wer schrieb das Kommunistische Manifest?', opts: ['Bismarck und Wilhelm', 'Marx und Engels', 'Goethe und Schiller', 'Napoleon und Metternich'], a: 1 },
          { q: 'Das Proletariat bestand aus:', opts: ['Adel und Klerus', 'Reichen Fabrikbesitzern', 'Fabrikarbeitern ohne Eigentum', 'Bauern mit Land'], a: 2 },
          { q: 'James Watt ist bekannt für:', opts: ['Die erste Eisenbahn', 'Die verbesserte Dampfmaschine', 'Das Kommunistische Manifest', 'Den Wiener Kongress'], a: 1 },
        ]
      },
      {
        id: 'kaiserreich',
        name: 'Deutsches Kaiserreich 1871',
        intro: 'Nach Bismarck\'s "Blut und Eisen"-Politik und drei Kriegen wurde das Deutsche Reich am 18. Januar 1871 im Spiegelsaal zu Versailles gegründet. Wilhelm I. wurde Kaiser, Bismarck Kanzler.',
        details: [
          '18. Januar 1871: Reichsgründung in Versailles',
          'Wilhelm I.: erster Deutscher Kaiser',
          'Bismarck: Reichskanzler, "Blut und Eisen", Realpolitik',
          'Drei Einigungskriege: Dänemark (1864), Österreich (1866), Frankreich (1870/71)',
          'Verfassung 1871: konstitutionelle Monarchie, Reichstag (Wahlrecht für Männer)',
          'Wilhelminismus: Kaiser Wilhelm II., Weltpolitik, Rüstung, Imperialismus',
          'Kulturkampf: Bismarck vs. katholische Kirche'
        ],
        quiz: [
          { q: 'Wann wurde das Deutsche Reich gegründet?', opts: ['1848', '1866', '1871', '1890'], a: 2 },
          { q: 'Wo fand die Reichsgründung statt?', opts: ['Berlin', 'Frankfurt', 'Versailles', 'Wien'], a: 2 },
          { q: 'Wer war der erste Reichskanzler?', opts: ['Wilhelm I.', 'Wilhelm II.', 'Bismarck', 'Metternich'], a: 2 },
          { q: 'Bismarcks Motto "Blut und Eisen" steht für:', opts: ['Friedliche Diplomatie', 'Machtpolitik durch Krieg', 'Arbeiterbewegung', 'Kirchenpolitik'], a: 1 },
          { q: 'Wie viele Einigungskriege gab es vor 1871?', opts: ['1', '2', '3', '4'], a: 2 },
          { q: 'Wilhelminismus bezeichnet die Ära:', opts: ['Wilhelms I.', 'Wilhelms II.', 'Bismarcks', 'Metternichs'], a: 1 },
        ]
      }
    ]
  },

  geo: {
    name: 'Geographie', emoji: '🌐', color: '#00ff88',
    topics: [
      {
        id: 'disparitaeten',
        name: 'Globale Disparitäten',
        intro: 'Disparitäten = Ungleichheiten zwischen Ländern. Entwicklungsländer (Global South) und Industrieländer (Global North) unterscheiden sich stark in Wirtschaft, Bildung, Gesundheit.',
        details: [
          'HDI (Human Development Index): Lebenserwartung, Bildung, Einkommen',
          'BIP pro Kopf: Wirtschaftsleistung je Einwohner',
          'Entwicklungsländer: niedriger HDI, hohe Armut, wenig Infrastruktur',
          'Schwellenländer: im Aufstieg (z.B. China, Brasilien, Indien)',
          'Industrieländer: hoher HDI, entwickelte Wirtschaft',
          'Ursachen: Kolonialismus, Rohstoffabhängigkeit, Klimanachteile',
          'Fairer Handel: bessere Preise für Bauern im Süden'
        ],
        quiz: [
          { q: 'Was misst der HDI?', opts: ['Nur das Einkommen', 'Lebenserwartung, Bildung, Einkommen', 'Militärstärke', 'Fläche und Bevölkerung'], a: 1 },
          { q: 'Was sind Disparitäten?', opts: ['Natürliche Ressourcen', 'Ungleichheiten zwischen Ländern', 'Klimazonen', 'Bevölkerungsdichte'], a: 1 },
          { q: 'Schwellenländer sind:', opts: ['Sehr reiche Länder', 'Sehr arme Länder', 'Länder im wirtschaftlichen Aufstieg', 'Kleine Inselstaaten'], a: 2 },
          { q: 'Fairer Handel zielt auf:', opts: ['Günstigere Preise für Verbraucher', 'Bessere Preise für Produzenten im Süden', 'Mehr Importe', 'Höhere Zölle'], a: 1 },
          { q: 'Welche Länder haben einen hohen HDI?', opts: ['Industrieländer', 'Entwicklungsländer', 'Schwellenländer', 'Alle gleich'], a: 0 },
          { q: 'Eine Ursache für globale Disparitäten ist:', opts: ['Fairer Handel', 'Kolonialismus', 'Hoher HDI', 'Gute Bildung'], a: 1 },
        ]
      },
      {
        id: 'bevoelkerung',
        name: 'Bevölkerungsentwicklung',
        intro: 'Die Weltbevölkerung wächst ungleich. Der demografische Übergang erklärt, wie sich Geburten- und Sterberaten in verschiedenen Entwicklungsphasen verändern.',
        details: [
          'Demografischer Übergang: 4 Phasen (hoch/hoch → hoch/sinkend → sinkend/niedrig → niedrig/niedrig)',
          'Bevölkerungsexplosion: stark in Entwicklungsländern',
          'Bevölkerungspyramide: Altersaufbau einer Bevölkerung',
          'Geburtenrate: Geburten pro 1000 Einwohner/Jahr',
          'Sterberate: Sterbefälle pro 1000 Einwohner/Jahr',
          'Migration: Wanderung von Menschen (Flucht, Arbeit, Familie)',
          'Megacities: Städte >10 Mio. Einwohner (v.a. in Asien/Afrika)'
        ],
        quiz: [
          { q: 'Wie viele Phasen hat der demografische Übergang?', opts: ['2', '3', '4', '5'], a: 2 },
          { q: 'In Entwicklungsländern ist die Geburtenrate meist:', opts: ['Niedrig', 'Mittel', 'Hoch', 'Gleich wie in Europa'], a: 2 },
          { q: 'Eine Megacity hat mehr als ... Einwohner:', opts: ['1 Million', '5 Millionen', '10 Millionen', '100 Millionen'], a: 2 },
          { q: 'Was zeigt eine Bevölkerungspyramide?', opts: ['Wirtschaftsleistung', 'Altersaufbau der Bevölkerung', 'Klimazonen', 'Rohstoffvorkommen'], a: 1 },
          { q: 'Migration bedeutet:', opts: ['Bevölkerungswachstum', 'Wanderung von Menschen', 'Sterberate senken', 'Städtebau'], a: 1 },
          { q: 'In welchen Regionen wachsen Megacities am schnellsten?', opts: ['Europa und USA', 'Australien', 'Asien und Afrika', 'Nordamerika'], a: 2 },
        ]
      },
      {
        id: 'klimazonen',
        name: 'Klimazonen & Ökosysteme',
        intro: 'Die Erde ist in Klimazonen eingeteilt: Tropen (heiß, feucht), Subtropen (trocken), gemäßigte Zone, Polarzone. Jede Zone hat typische Ökosysteme (Regenwald, Savanne, Wüste...).',
        details: [
          'Tropen: ganzjährig heiß (>25°C), viel Regen → tropischer Regenwald',
          'Subtropen: heiß-trocken (Wüste) oder heiß-feucht mit Trockenzeit (Savanne)',
          'Gemäßigte Zone: 4 Jahreszeiten, Laubwald, Steppe',
          'Polarzonen: ganzjährig kalt, Tundra, Eis',
          'Klimadiagramm lesen: Balken = Niederschlag, Linie = Temperatur',
          'Regenwald: höchste Biodiversität, Lunge der Erde',
          'Wüsten: weniger 250mm Regen/Jahr, heiß (Sahara) oder kalt (Gobi)'
        ],
        quiz: [
          { q: 'Welches Ökosystem hat die höchste Artenvielfalt?', opts: ['Wüste', 'Tundra', 'Tropischer Regenwald', 'Steppe'], a: 2 },
          { q: 'In Klimadiagrammen zeigen Balken:', opts: ['Temperatur', 'Niederschlag', 'Wind', 'Sonnenstunden'], a: 1 },
          { q: 'Wüsten erhalten weniger als ... mm Regen pro Jahr:', opts: ['100', '250', '500', '1000'], a: 1 },
          { q: 'Die Savanne liegt in den:', opts: ['Tropen', 'Subtropen zwischen Regenwald und Wüste', 'Polargebieten', 'Gemäßigten Zonen'], a: 1 },
          { q: 'Die gemäßigte Zone hat:', opts: ['Ganzjährig Hitze', '4 Jahreszeiten', 'Kein Wasser', 'Nur Trockenzeit'], a: 1 },
          { q: 'Der tropische Regenwald wird auch genannt:', opts: ['Lunge der Erde', 'Grüne Sahara', 'Polareis', 'Tundra'], a: 0 },
        ]
      },
      {
        id: 'energie-rohstoffe',
        name: 'Energie & Rohstoffe',
        intro: 'Die Welt verbraucht enorme Mengen Energie — noch immer hauptsächlich aus fossilen Brennstoffen (Kohle, Öl, Gas). Erneuerbare Energien wachsen, aber die Energiewende ist eine Herausforderung.',
        details: [
          'Fossile Brennstoffe: Kohle, Erdöl, Erdgas — endlich, CO₂-Ausstoß',
          'Erneuerbare Energien: Solar, Wind, Wasser, Geothermie, Biomasse',
          'Energiewende: Übergang zu erneuerbaren Energien',
          'Ressourcenkonflikte: Öl-, Gas- und Mineralvorkommen = Machtfaktor',
          'Konfliktmineralien: Coltan (Handy), Lithium (Akkus), Kobalt',
          'Peak Oil: theoretisches Maximum der Ölförderung',
          'Nachhaltigkeit: Ressourcen so nutzen, dass Zukunftsgenerationen genug haben'
        ],
        quiz: [
          { q: 'Fossile Brennstoffe sind:', opts: ['Erneuerbar', 'Endlich und CO₂-intensiv', 'Umweltneutral', 'Unerschöpflich'], a: 1 },
          { q: 'Coltan wird verwendet für:', opts: ['Kleidung', 'Nahrungsmittel', 'Elektronik/Handys', 'Baumaterial'], a: 2 },
          { q: 'Was ist "Peak Oil"?', opts: ['Maximum des Ölverbrauchs', 'Theoretisches Maximum der Ölförderung', 'Ende des Öls', 'Ölpreis-Höchststand'], a: 1 },
          { q: 'Nachhaltigkeit bedeutet:', opts: ['Alles verbrauchen', 'So wirtschaften, dass Zukunft noch genug hat', 'Nur erneuerbare Energie nutzen', 'Keine Industrie'], a: 1 },
          { q: 'Welche Energie ist erneuerbar?', opts: ['Erdöl', 'Erdgas', 'Kohle', 'Solarenergie'], a: 3 },
          { q: 'Ressourcenkonflikte entstehen durch:', opts: ['Zu viel Regen', 'Wertvolle Rohstoffvorkommen als Machtfaktor', 'Bevölkerungsrückgang', 'Klimadiagramme'], a: 1 },
        ]
      }
    ]
  },

  latein: {
    name: 'Latein', emoji: '🏛️', color: '#ff6b6b',
    grammar: [
      {
        id: 'aci',
        name: 'AcI — Accusativus cum Infinitivo',
        content: 'Der AcI ist eine indirekte Aussage. Nach Verben des Sagens, Meinens, Hörens, Sehens steht kein "dass"-Satz, sondern: Subjekt im Akkusativ + Infinitiv.',
        examples: [
          'Dico Caesarem venire. → Ich sage, dass Caesar kommt.',
          'Audimus milites pugnare. → Wir hören, dass die Soldaten kämpfen.',
          'Puto te errare. → Ich glaube, dass du irrst.'
        ],
        verbs: ['dicere', 'putare', 'credere', 'scire', 'videre', 'audire', 'sperare', 'negare']
      },
      {
        id: 'konjunktiv',
        name: 'Konjunktiv im Hauptsatz',
        content: 'Im lateinischen Hauptsatz drückt der Konjunktiv verschiedene Bedeutungen aus. Wichtigste Typen für Klasse 8: Deliberativus (Überlegung), Potentialis (Möglichkeit), Irrealis (Unwirklichkeit).',
        examples: [
          'Deliberativus: Quid faciam? → Was soll ich tun?',
          'Potentialis: Hoc dicas. → Du könntest das sagen.',
          'Irrealis Gegenwart: Si venires, gauderem. → Wenn du kämmest, würde ich mich freuen.',
          'Irrealis Vergangenheit: Si venisses, gauvisus essem. → Wenn du gekommen wärst, hätte ich mich gefreut.'
        ]
      },
      {
        id: 'gerundiv',
        name: 'Gerundiv',
        content: 'Das Gerundiv (Verbaladjektiv auf -ndus/-nda/-ndum) drückt Notwendigkeit aus. Mit "esse" = "muss getan werden". Es stimmt mit dem Nomen überein.',
        examples: [
          'Pax petenda est. → Frieden muss gesucht werden.',
          'Libri legendi sunt. → Die Bücher müssen gelesen werden.',
          'Mihi iter faciendum est. → Ich muss eine Reise machen. (Dativus auctoris)'
        ]
      },
      {
        id: 'deponenten',
        name: 'Deponenten & Semideponenten',
        content: 'Deponenten haben passive Form, aber aktive Bedeutung. Semideponenten: Präsens aktiv, aber Perfekt passiv.',
        examples: [
          'loqui (spricht) — Ille loquitur. → Er spricht.',
          'sequi (folgt) — Te sequor. → Ich folge dir.',
          'Semideponent: audere — ausus sum = ich wagte'
        ],
        list: ['loqui', 'sequi', 'pati', 'uti', 'frui', 'fungi', 'nasci', 'mori', 'proficisci', 'conari']
      }
    ],
    quiz: [
      { q: 'Was ist ein AcI?', opts: ['Ein Konjunktiv', 'Indirekte Rede mit Akkusativ + Infinitiv', 'Eine Präposition', 'Ein Deponent'], a: 1 },
      { q: '"Pax petenda est" bedeutet:', opts: ['Der Frieden wurde gesucht', 'Frieden muss gesucht werden', 'Frieden wurde gefunden', 'Frieden wurde gebracht'], a: 1 },
      { q: 'Deponenten haben:', opts: ['Aktive Form, passive Bedeutung', 'Passive Form, aktive Bedeutung', 'Nur Präsens', 'Nur Imperativ'], a: 1 },
      { q: '"Dico Caesarem venire" — Caesar steht im:', opts: ['Nominativ', 'Dativ', 'Akkusativ (AcI)', 'Ablativ'], a: 2 },
      { q: '"Quid faciam?" ist ein:', opts: ['Potentialis', 'Deliberativus', 'Irrealis', 'AcI'], a: 1 },
      { q: 'loqui, sequi, pati sind:', opts: ['Semideponenten', 'Normale Verben', 'Deponenten', 'Konjunktive'], a: 2 },
    ]
  },

  physik: {
    name: 'Physik',
    emoji: '⚡',
    color: '#b44fff',
    sections: [
      { id: 'optik', name: '🔬 Optik', color: '#00e5ff' },
      { id: 'mechanik', name: '⚙️ Mechanik', color: '#39ff14' }
    ],
    topics: [
      // OPTIK
      {
        id: 'lichtausbreitung',
        name: 'Lichtausbreitung',
        icon: '💡',
        section: 'optik',
        intro: 'Licht breitet sich von einer <strong>Lichtquelle (Sender)</strong> geradlinig in alle Richtungen aus — solange es im gleichen Medium bleibt. Wir sehen Objekte, weil Licht von ihnen in unser Auge (den <strong>Empfänger</strong>) gelangt.',
        merkbox: [
          'Licht breitet sich <strong>geradlinig</strong> aus (im homogenen Medium)',
          'Lichtgeschwindigkeit: c ≈ 300.000 km/s im Vakuum',
          'Eigenleuchter (Sonne, Lampe) vs. Fremdleuchter (Mond, Tisch)',
          'Kernschatten (vollständig dunkel) & Halbschatten'
        ],
        deepTitle: 'Licht — tiefer betrachtet',
        deep: '<h4>Was ist Licht?</h4><p>Licht ist eine elektromagnetische Welle mit Wellenlängen zwischen 380 nm (violett) und 780 nm (rot). Im Vakuum und in Luft breitet es sich geradlinig aus.</p><div class="physik-formel">c ≈ 3 · 10⁸ m/s im Vakuum</div><h4>Sender-Empfänger-Modell</h4><p>Wir sehen nur Objekte, von denen Licht unser Auge erreicht — entweder direkt (Glühbirne = Sender) oder reflektiert (Buch = Fremdleuchter).</p><h4>Schatten</h4><p>Entstehen weil Licht sich geradlinig ausbreitet und von opaken Objekten blockiert wird. <strong>Mondfinsternis:</strong> Erde wirft Schatten auf Mond. <strong>Sonnenfinsternis:</strong> Mond wirft Schatten auf Erde.</p>',
        canvas: 'c-phys-licht',
        canvasW: 500, canvasH: 280,
        drawFn: 'drawLichtPhys',
        controls: null,
        quiz: [
          { q: 'Was ist das Sender-Empfänger-Modell?', opts: ['Wir sehen nur Licht das zu uns gelangt','Licht sendet Signale','Beide Augen senden Licht','Licht wird hin und her geschickt'], a: 0 },
          { q: 'Wie schnell ist Licht im Vakuum?', opts: ['30.000 km/s','3.000 km/s','300.000 km/s','3.000.000 km/s'], a: 2 },
          { q: 'Was ist ein Eigenleuchter?', opts: ['Mond','Tisch','Buch','Sonne'], a: 3 },
          { q: 'Kernschatten ist...', opts: ['Leicht beleuchtet','Vollständig dunkel','Nur im Weltall','Nur bei Sonnenfinsternis'], a: 1 },
          { q: 'In welchem Medium breitet sich Licht geradlinig aus?', opts: ['Nur in Wasser','Nur im Vakuum','Im homogenen Medium','In Glas'], a: 2 },
          { q: 'Mondfinsternis entsteht wenn...', opts: ['Mond vor Sonne steht','Erde im Mondschatten','Mond im Erdschatten','Sonne hinter Erde'], a: 2 }
        ]
      },
      {
        id: 'reflexion',
        name: 'Reflexion',
        icon: '🪞',
        section: 'optik',
        intro: 'Wenn Licht auf eine Fläche trifft, wird es <strong>reflektiert</strong>. Das Reflexionsgesetz: <em>Einfallswinkel α = Ausfallswinkel α\'</em>. Beide Winkel werden zur <strong>Normalen</strong> gemessen.',
        merkbox: [
          '<strong>Reflexionsgesetz:</strong> α (Einfall) = α\'(Ausfall)',
          'Winkel immer zur <strong>Normalen</strong> messen, nicht zur Fläche!',
          'Spiegelbild ist ein <strong>virtuelles Bild</strong> — aufrecht, gleich groß, seitenvertauscht',
          'Gerichtete (Spiegel) ≠ diffuse (Papier) Reflexion'
        ],
        deepTitle: 'Reflexion — tiefer betrachtet',
        deep: '<div class="physik-formel">α_ein = α_aus</div><h4>Gerichtete vs. diffuse Reflexion</h4><p><strong>Spiegel</strong> = gerichtete Reflexion (alle Strahlen werden gleich reflektiert). <strong>Papier/Wand</strong> = diffuse Reflexion (Oberfläche mikroskopisch rau).</p><h4>Virtuelles Bild</h4><p>Das Bild liegt <em>scheinbar</em> hinter dem Spiegel — gleich weit entfernt wie das Objekt davor, seitenverkehrt, aufrecht, gleich groß.</p>',
        canvas: 'c-phys-reflex',
        canvasW: 500, canvasH: 280,
        drawFn: 'drawReflexPhys',
        controls: [{ type: 'range', id: 'phys-reflex-slider', label: 'Einfallswinkel', valId: 'phys-reflex-val', min: 0, max: 85, value: 40, unit: '°', fn: 'drawReflexPhys' }],
        quiz: [
          { q: 'Was besagt das Reflexionsgesetz?', opts: ['Einfallswinkel = Ausfallswinkel','Einfallswinkel + Ausfallswinkel = 90°','Licht wird gebrochen','Licht verlangsamt sich'], a: 0 },
          { q: 'Wozu misst man den Winkel?', opts: ['Zur Spiegeloberfläche','Zur Normalen','Zum Horizont','Zum Einfallsstrahl'], a: 1 },
          { q: 'Was ist ein virtuelles Bild?', opts: ['Auf Schirm sichtbar','Hinter dem Spiegel, nicht fangbar','Reelles Abbild','Gleich wie reelles Bild'], a: 1 },
          { q: 'Diffuse Reflexion entsteht bei...', opts: ['Glatten Spiegeln','Rauer Oberfläche','Flüssigkeiten','Glas'], a: 1 },
          { q: 'Spiegelbild ist...', opts: ['Vergrößert','Verkleinert','Gleich groß','Kleiner'], a: 2 },
          { q: 'Was ist die Normale?', opts: ['Parallele zur Fläche','Senkrechte zur Oberfläche','Einfallsstrahl','Ausfallsstrahl'], a: 1 }
        ]
      },
      {
        id: 'brechung',
        name: 'Brechung',
        icon: '💧',
        section: 'optik',
        intro: 'An einer <strong>Grenzfläche</strong> zwischen zwei Medien ändert Licht seine Richtung. Das Snell\'sche Gesetz: <em>n₁ · sin(α) = n₂ · sin(β)</em>. Beim Übergang in ein dichteres Medium wird der Strahl zur Normalen hin gebrochen.',
        merkbox: [
          'Luft → Wasser: Strahl zur <strong>Normalen hin gebrochen</strong>',
          'Wasser → Luft: Strahl <strong>von der Normalen weg</strong>',
          'Brechungsindex: Luft n≈1,00 | Wasser n≈1,33 | Glas n≈1,50',
          'Optische Hebung: Fisch im Wasser wirkt höher als er ist'
        ],
        deepTitle: 'Brechung — tiefer betrachtet',
        deep: '<div class="physik-formel">n₁ · sin(α₁) = n₂ · sin(α₂)</div><div class="physik-formel">n = c₀ / c_Medium</div><h4>Warum bricht Licht?</h4><p>Analogie: Ein Auto fährt von Asphalt auf Sand. Das erste Rad das in den Sand kommt wird langsamer — das Auto dreht sich. Genauso biegen Lichtwellen ihre Richtung.</p><h4>Prisma</h4><p>Bricht weißes Licht in Regenbogenfarben (Dispersion) — Rot am wenigsten, Violett am stärksten.</p>',
        canvas: 'c-phys-brech',
        canvasW: 500, canvasH: 280,
        drawFn: 'drawBrechPhys',
        controls: [{ type: 'range', id: 'phys-brech-slider', label: 'Einfallswinkel', valId: 'phys-brech-val', min: 0, max: 80, value: 40, unit: '°', fn: 'drawBrechPhys' }],
        quiz: [
          { q: 'Was ist Brechung?', opts: ['Reflexion an Spiegel','Richtungsänderung an Grenzfläche','Totalreflexion','Streuung von Licht'], a: 1 },
          { q: 'n₁·sin(α) = n₂·sin(β) heißt...', opts: ['Reflexionsgesetz','Snell\'sches Gesetz','Newton\'sches Gesetz','Fresnel-Gesetz'], a: 1 },
          { q: 'Brechungsindex Wasser ist ca.', opts: ['1,00','1,33','1,50','2,00'], a: 1 },
          { q: 'Luft→Wasser: Strahl wird...', opts: ['Von Normalen weg gebrochen','Zur Normalen hin gebrochen','Nicht gebrochen','Totalreflektiert'], a: 1 },
          { q: 'Optische Hebung bedeutet:', opts: ['Objekt erscheint tiefer als es ist','Objekt erscheint höher als es ist','Objekt ist unsichtbar','Licht wird absorbiert'], a: 1 },
          { q: 'Je größer n, desto...', opts: ['Schneller das Licht','Langsamer das Licht','Stärker die Reflexion','Größer der Schatten'], a: 1 }
        ]
      },
      {
        id: 'totalreflexion',
        name: 'Totalreflexion',
        icon: '🌈',
        section: 'optik',
        intro: 'Beim Übergang von optisch dichterem zu dünnerem Medium gibt es einen <strong>kritischen Winkel</strong>. Wird er überschritten, kommt gar kein Licht durch — <strong>Totalreflexion!</strong><br><em>sin(α_krit) = n₂/n₁ → Wasser/Luft: α_krit ≈ 48,8°</em>',
        merkbox: [
          'Nur bei <strong>dichter → dünner</strong> (z.B. Wasser → Luft)',
          'Nur wenn Winkel <strong>größer als kritischer Winkel</strong>',
          'Kritischer Winkel Wasser→Luft: <strong>≈ 48,8°</strong>',
          'Glasfaserkabel nutzen Totalreflexion → schnelles Internet!'
        ],
        deepTitle: 'Totalreflexion — tiefer betrachtet',
        deep: '<div class="physik-formel">sin(α_krit) = n₂ / n₁</div><p>Für Wasser→Luft: α_krit ≈ 48,8° | Für Glas→Luft: α_krit ≈ 41,8°</p><h4>Glasfaser (Lichtleiter)</h4><p>Licht wird durch Totalreflexion im Kern gehalten. Bandbreite: bis zu mehreren Tbit/s. Das Glasfasernetz überträgt so das Internet.</p><h4>Diamant</h4><p>n=2,42 → kritischer Winkel nur 24,4°. Deshalb totalreflektiert Diamant Licht sehr oft → funkelt so stark.</p>',
        canvas: 'c-phys-total',
        canvasW: 500, canvasH: 280,
        drawFn: 'drawTotalPhys',
        controls: [{ type: 'range', id: 'phys-total-slider', label: 'Einfallswinkel', valId: 'phys-total-val', min: 0, max: 89, value: 30, unit: '°', fn: 'drawTotalPhys' }],
        quiz: [
          { q: 'Wann tritt Totalreflexion auf?', opts: ['Licht von dünner zu dichter','Immer bei Glas','Dichter zu dünner + Winkel > kritisch','Nur im Vakuum'], a: 2 },
          { q: 'Kritischer Winkel Wasser→Luft beträgt ca.', opts: ['30°','48,8°','90°','24,4°'], a: 1 },
          { q: 'Glasfaserkabel nutzt...', opts: ['Brechung','Diffuse Reflexion','Totalreflexion','Absorption'], a: 2 },
          { q: 'sin(α_krit) = ?', opts: ['n₁/n₂','n₂/n₁','n₁·n₂','n₁+n₂'], a: 1 },
          { q: 'Warum funkelt Diamant so stark?', opts: ['Wegen seiner Farbe','Kleiner kritischer Winkel → viele Totalreflexionen','Großer Brechungsindex reicht','Spiegelglatte Oberfläche'], a: 1 },
          { q: 'Totalreflexion findet statt wenn α...', opts: ['Kleiner als α_krit','Gleich α_krit','Größer als α_krit','Gleich 0°'], a: 2 }
        ]
      },
      {
        id: 'linsen',
        name: 'Linsen',
        icon: '🔭',
        section: 'optik',
        intro: 'Linsen brechen Licht gezielt. Die <strong>Sammellinse</strong> bündelt parallele Strahlen im <strong>Brennpunkt F\'</strong>. Die <strong>Zerstreuungslinse</strong> spreizt Strahlen auf.<br><em>1/f = 1/g + 1/b</em> (Linsengleichung)',
        merkbox: [
          '<strong>3 Hauptstrahlen</strong>: Parallelstrahl → F\' | Mittelpunktstrahl → ungebrochen | Brennpunktstrahl → Parallelstrahl',
          'g > 2f: Bild kleiner | g = 2f: gleich groß | f < g < 2f: Bild größer',
          'g < f: virtuelles, aufrechtes, vergrößertes Bild (Lupe)',
          'Zerstreuungslinse: immer virtuelles, aufrechtes, verkleinertes Bild'
        ],
        deepTitle: 'Linsen — tiefer betrachtet',
        deep: '<div class="physik-formel">1/f = 1/g + 1/b</div><div class="physik-formel">D = 1/f [Dioptrien, f in Meter]</div><h4>Fallunterscheidungen Sammellinse</h4><ul style="padding-left:1.2rem;margin-top:.5rem"><li>g > 2f: reell, verkleinert, umgekehrt</li><li>g = 2f: reell, gleich groß, umgekehrt</li><li>f < g < 2f: reell, vergrößert, umgekehrt</li><li>g < f: virtuell, vergrößert, aufrecht (Lupe)</li></ul>',
        canvas: 'c-phys-linse',
        canvasW: 500, canvasH: 300,
        drawFn: 'drawLinsePhys',
        controls: [
          { type: 'range', id: 'phys-linse-slider', label: 'Gegenstandsweite g', valId: 'phys-linse-val', min: 15, max: 40, value: 25, unit: 'f', fn: 'drawLinsePhys' },
          { type: 'button', label: '🔄 Zerstreuungslinse', id: 'phys-linse-toggle', fn: 'toggleLinsePhys' }
        ],
        quiz: [
          { q: 'Wie lautet die Linsengleichung?', opts: ['f = g + b','1/f = 1/g + 1/b','f = g · b','g = f + b'], a: 1 },
          { q: 'Was ist die Brennweite f?', opts: ['Gegenstandsweite','Abstand Linse zu Brennpunkt','Bildgröße','Brechungsindex'], a: 1 },
          { q: 'g > 2f: Das Bild ist...', opts: ['Vergrößert, aufrecht','Gleich groß','Verkleinert, umgekehrt, reell','Virtuell'], a: 2 },
          { q: 'g < f → Lupe-Effekt bedeutet:', opts: ['Reelles, umgekehrtes Bild','Virtuelles, vergrößertes Bild','Kein Bild','Verkleinertes reelles Bild'], a: 1 },
          { q: 'Was macht die Zerstreuungslinse?', opts: ['Bündelt Strahlen','Spreizt Strahlen auf','Reflektiert Licht','Absorbiert Licht'], a: 1 },
          { q: 'Was sind Dioptrien?', opts: ['Brennweite in cm','Kehrwert der Brennweite in Meter','Brechungsindex','Linsengröße'], a: 1 }
        ]
      },
      {
        id: 'auge',
        name: 'Auge & Fehlsichtigkeit',
        icon: '👁️',
        section: 'optik',
        intro: 'Das Auge fokussiert Licht auf die <strong>Netzhaut</strong>. Bei <strong>Kurzsichtigkeit</strong> fokussiert es vor der Netzhaut (Zerstreuungslinse hilft). Bei <strong>Weitsichtigkeit</strong> dahinter (Sammellinse hilft).',
        merkbox: [
          'Normalsichtig: Fokus genau auf der Netzhaut',
          'Kurzsichtig: Augapfel zu lang → Fokus <strong>vor</strong> Netzhaut → Zerstreuungslinse',
          'Weitsichtig: Augapfel zu kurz → Fokus <strong>hinter</strong> Netzhaut → Sammellinse',
          'Stäbchen: Dunkelheit | Zapfen: Farben | Fovea: schärftes Sehen'
        ],
        deepTitle: 'Auge — tiefer betrachtet',
        deep: '<h4>Aufbau des Auges</h4><p><strong>Hornhaut</strong> → <strong>Iris/Pupille</strong> → <strong>Linse</strong> → <strong>Glaskörper</strong> → <strong>Netzhaut</strong> (Stäbchen + Zapfen) → <strong>Sehnerv</strong></p><h4>Akkommodation</h4><p>Die Augenlinse kann ihre Krümmung ändern (Ziliarmuskel) — so scharf stellen auf nah und fern.</p><h4>Dioptrienzahl</h4><p>Kurzsichtig: negative Dioptrien | Weitsichtig: positive Dioptrien</p>',
        canvas: 'c-phys-auge',
        canvasW: 500, canvasH: 220,
        drawFn: 'drawAugePhys',
        controls: [
          { type: 'radio', id: 'phys-eye-mode', label: 'Fehlsichtigkeit', options: [{val:'normal',label:'Normal'},{val:'kurz',label:'Kurzsichtig'},{val:'weit',label:'Weitsichtig'}], fn: 'setAugeModePhys' },
          { type: 'checkbox', id: 'phys-brille-check', label: 'Korrekturbrille', fn: 'drawAugePhys' }
        ],
        quiz: [
          { q: 'Kurzsichtigkeit: Fokus liegt...', opts: ['Auf der Netzhaut','Hinter der Netzhaut','Vor der Netzhaut','In der Linse'], a: 2 },
          { q: 'Welche Linse korrigiert Kurzsichtigkeit?', opts: ['Sammellinse','Zerstreuungslinse','Planlinse','Bikonvexlinse'], a: 1 },
          { q: 'Weitsichtigkeit: Augapfel ist...', opts: ['Zu lang','Zu kurz','Normal groß','Verformt'], a: 1 },
          { q: 'Stäbchen in der Netzhaut sind für...', opts: ['Farbsehen','Sehen bei Dunkelheit','Scharfsehen','Nahsehen'], a: 1 },
          { q: 'Was ist die Fovea?', opts: ['Der blinde Fleck','Die Pupille','Die Stelle schärfsten Sehens','Die Hornhaut'], a: 2 },
          { q: 'Akkommodation ist...', opts: ['Anpassung der Linsenkrümmung','Erweiterung der Pupille','Bewegung des Augapfels','Kontraktion der Netzhaut'], a: 0 }
        ]
      },
      // MECHANIK
      {
        id: 'geschwindigkeit',
        name: 'Geschwindigkeit',
        icon: '🏎️',
        section: 'mechanik',
        intro: 'Geschwindigkeit beschreibt wie schnell sich ein Objekt bewegt. <strong>v = s / t</strong> (Weg geteilt durch Zeit). Einheiten: m/s oder km/h. Umrechnung: 1 m/s = 3,6 km/h.',
        merkbox: [
          '<strong>v = s / t</strong> (Grundformel)',
          'Umrechnung: 1 m/s = 3,6 km/h',
          's = v · t (Weg) | t = s / v (Zeit)',
          'Gleichförmige Bewegung: v = konstant'
        ],
        deepTitle: 'Geschwindigkeit — tiefer betrachtet',
        deep: '<div class="physik-formel">v = s / t</div><h4>Gleichförmige vs. beschleunigte Bewegung</h4><p>Bei gleichförmiger Bewegung ist v konstant. Bei beschleunigter Bewegung ändert sich v mit der Zeit.</p><h4>Durchschnittliche vs. momentane Geschwindigkeit</h4><p>Tachometer zeigt Momentangeschwindigkeit. v_mittel = Gesamtweg / Gesamtzeit.</p>',
        canvas: 'c-phys-geschw',
        canvasW: 500, canvasH: 200,
        drawFn: 'animGeschwPhys',
        controls: [{ type: 'range', id: 'phys-geschw-slider', label: 'Geschwindigkeit', valId: 'phys-geschw-val', min: 10, max: 120, value: 60, unit: ' km/h', fn: 'updateGeschwPhys' }],
        quiz: [
          { q: 'Wie lautet die Formel für Geschwindigkeit?', opts: ['v = t / s','v = s · t','v = s / t','s = v / t'], a: 2 },
          { q: '72 km/h in m/s =', opts: ['20 m/s','25 m/s','10 m/s','72 m/s'], a: 0 },
          { q: 'Bei gleichförmiger Bewegung ist...', opts: ['v steigt an','v konstant','Beschleunigung positiv','v sinkt'], a: 1 },
          { q: '1 m/s entspricht:', opts: ['1 km/h','3,6 km/h','0,6 km/h','36 km/h'], a: 1 },
          { q: 'Ein Auto fährt 200m in 10s. v = ?', opts: ['10 m/s','20 m/s','2 m/s','200 m/s'], a: 1 },
          { q: 'Was misst ein Tachometer?', opts: ['Durchschnittgeschwindigkeit','Momentangeschwindigkeit','Weg','Beschleunigung'], a: 1 }
        ]
      },
      {
        id: 'diagramme',
        name: 'Bewegungsdiagramme',
        icon: '📊',
        section: 'mechanik',
        intro: 'Das <strong>s-t-Diagramm</strong> zeigt den Weg über die Zeit (Steigung = Geschwindigkeit). Das <strong>v-t-Diagramm</strong> zeigt Geschwindigkeit über die Zeit (Fläche = zurückgelegter Weg).',
        merkbox: [
          's-t-Diagramm: Steigung der Geraden = Geschwindigkeit v',
          'v-t-Diagramm: Fläche unter der Kurve = zurückgelegter Weg s',
          'Gleichförmig: Gerade im s-t | Horizontale im v-t',
          'Beschleunigt: Parabel im s-t | Ansteigende Gerade im v-t'
        ],
        deepTitle: 'Diagramme — tiefer betrachtet',
        deep: '<h4>s-t-Diagramm</h4><p>Steigung der Geraden = Geschwindigkeit. Horizontale Linie = Ruhe (v=0). Steilere Gerade = höhere Geschwindigkeit.</p><h4>v-t-Diagramm</h4><p>Horizontale Linie = gleichförmige Bewegung. Ansteigende Linie = gleichmäßige Beschleunigung. Fläche unter Kurve = s.</p>',
        canvas: 'c-phys-diagramm',
        canvasW: 500, canvasH: 240,
        drawFn: 'drawDiagrammePhys',
        controls: [{ type: 'range', id: 'phys-diagramm-slider', label: 'Geschwindigkeit', valId: 'phys-diagramm-val', min: 1, max: 20, value: 10, unit: ' m/s', fn: 'drawDiagrammePhys' }],
        quiz: [
          { q: 'Was zeigt die Steigung im s-t-Diagramm?', opts: ['Beschleunigung','Geschwindigkeit v','Weg s','Kraft'], a: 1 },
          { q: 'Fläche unter v-t-Kurve entspricht:', opts: ['Kraft','Beschleunigung','Zurückgelegtem Weg','Zeit'], a: 2 },
          { q: 'Horizontale Linie im s-t-Diagramm bedeutet:', opts: ['Gleichförmige Bewegung','Ruhe','Beschleunigung','Abbremsen'], a: 1 },
          { q: 'Steile Gerade im s-t-Diagramm bedeutet:', opts: ['Geringe Geschwindigkeit','Hohe Geschwindigkeit','Ruhe','Bremsung'], a: 1 },
          { q: 'Gleichförmige Bewegung im v-t-Diagramm zeigt:', opts: ['Ansteigende Gerade','Horizontale Linie','Parabel','Senkrechte Linie'], a: 1 },
          { q: 'Bei Beschleunigung zeigt das s-t-Diagramm:', opts: ['Gerade','Horizontale','Parabel','Senkrechte'], a: 2 }
        ]
      },
      {
        id: 'newton',
        name: 'Newtonsche Gesetze',
        icon: '⚡',
        section: 'mechanik',
        intro: '<strong>1. Gesetz (Trägheit):</strong> Körper ohne Kraft bleibt in Ruhe oder gleichförmiger Bewegung.<br><strong>2. Gesetz (F = m·a):</strong> Kraft = Masse × Beschleunigung.<br><strong>3. Gesetz (Actio = Reactio):</strong> Kräfte treten immer paarweise auf.',
        merkbox: [
          'F = m · a (Grundgesetz der Mechanik)',
          'Einheit: 1 N = 1 kg · m/s²',
          'Actio = Reactio: gleich groß, entgegengesetzt',
          'Trägheitsgesetz: ohne Kraft keine Bewegungsänderung'
        ],
        deepTitle: 'Newtonsche Gesetze — tiefer betrachtet',
        deep: '<div class="physik-formel">F = m · a</div><h4>1. Newtonsches Gesetz</h4><p>Trägheitsgesetz: Jeder Körper verharrt im Zustand der Ruhe oder der gleichförmigen Bewegung, solange keine Kraft auf ihn wirkt.</p><h4>2. Newtonsches Gesetz</h4><p>F = m · a. Große Masse → kleine Beschleunigung bei gleicher Kraft.</p><h4>3. Newtonsches Gesetz</h4><p>Actio = Reactio: Wirkt Körper A eine Kraft auf B aus, wirkt B die gleiche Kraft zurück auf A (entgegengesetzt).</p>',
        canvas: 'c-phys-newton',
        canvasW: 500, canvasH: 260,
        drawFn: 'drawNewtonPhys',
        controls: [
          { type: 'range', id: 'phys-newton-m', label: 'Masse m', valId: 'phys-newton-m-val', min: 1, max: 20, value: 5, unit: ' kg', fn: 'drawNewtonPhys' },
          { type: 'range', id: 'phys-newton-f', label: 'Kraft F', valId: 'phys-newton-f-val', min: 5, max: 100, value: 20, unit: ' N', fn: 'drawNewtonPhys' }
        ],
        quiz: [
          { q: 'F = m · a. Was ist Einheit der Kraft?', opts: ['kg·m','N = kg·m/s²','m/s','J'], a: 1 },
          { q: 'Masse 10kg, Kraft 50N. a = ?', opts: ['500 m/s²','0,2 m/s²','5 m/s²','10 m/s²'], a: 2 },
          { q: 'Das Trägheitsgesetz sagt:', opts: ['Kräfte sind gleich groß','F = m·a','Körper ohne Kraft ändert Zustand nicht','Actio = Reactio'], a: 2 },
          { q: 'Actio = Reactio bedeutet:', opts: ['Kräfte addieren sich','Gleiche Kraft, gleiche Richtung','Kräfte gleich groß, entgegengesetzt','Kräfte heben sich immer auf'], a: 2 },
          { q: 'Wer formulierte F = m·a?', opts: ['Einstein','Galilei','Newton','Archimedes'], a: 2 },
          { q: '1 Newton entspricht:', opts: ['1 kg/m²','1 kg·m/s²','1 m/s','1 kg·s'], a: 1 }
        ]
      },
      {
        id: 'vektoren',
        name: 'Vektoren',
        icon: '🔀',
        section: 'mechanik',
        intro: 'Kräfte sind <strong>Vektoren</strong> — sie haben Betrag UND Richtung. Mehrere Kräfte werden durch <strong>Vektoraddition</strong> zum <strong>Resultierenden</strong> zusammengefasst.',
        merkbox: [
          'Vektor: Betrag + Richtung (Pfeil)',
          'Resultierende R = Vektorsumme aller Kräfte',
          'Parallelogrammregel: Vektoren bilden ein Parallelogramm',
          'Komponenten: F_x = F·cos(α), F_y = F·sin(α)'
        ],
        deepTitle: 'Vektoren — tiefer betrachtet',
        deep: '<h4>Vektoraddition</h4><p>Methode: Vektoren hintereinanderhängen (Kopf-Schwanz) oder Parallelogramm aufbauen. Die Diagonale ist die Resultierende.</p><div class="physik-formel">|R| = √(R_x² + R_y²)</div><h4>Komponenten</h4><p>F_x = F·cos(α), F_y = F·sin(α). Mit Pythagoras und Winkelfunktionen alle Probleme lösbar.</p>',
        canvas: 'c-phys-vektor',
        canvasW: 500, canvasH: 260,
        drawFn: 'drawVektorenPhys',
        controls: [
          { type: 'range', id: 'phys-v-f1', label: 'F₁', valId: 'phys-v-f1-val', min: 10, max: 80, value: 40, unit: ' N', fn: 'drawVektorenPhys' },
          { type: 'range', id: 'phys-v-a1', label: 'Winkel α₁', valId: 'phys-v-a1-val', min: 0, max: 180, value: 30, unit: '°', fn: 'drawVektorenPhys' },
          { type: 'range', id: 'phys-v-f2', label: 'F₂', valId: 'phys-v-f2-val', min: 10, max: 80, value: 30, unit: ' N', fn: 'drawVektorenPhys' },
          { type: 'range', id: 'phys-v-a2', label: 'Winkel α₂', valId: 'phys-v-a2-val', min: 0, max: 180, value: 120, unit: '°', fn: 'drawVektorenPhys' }
        ],
        quiz: [
          { q: 'Was ist ein Vektor?', opts: ['Nur ein Betrag','Betrag und Richtung','Nur eine Richtung','Skalare Größe'], a: 1 },
          { q: 'Resultierende ist...', opts: ['Differenz der Kräfte','Vektorsumme aller Kräfte','Nur die größte Kraft','Produkt der Kräfte'], a: 1 },
          { q: 'F_x = F·cos(α) berechnet...', opts: ['Vertikalkomponente','Betrag','Horizontalkomponente','Resultierende'], a: 2 },
          { q: '|R| = √(R_x² + R_y²) ist...', opts: ['Snell\'sches Gesetz','Pythagoras für Vektoren','Newton 2. Gesetz','Linsenformel'], a: 1 },
          { q: 'Parallelogrammregel dient zur...', opts: ['Vektorzerlegung','Vektoraddition','Kraftberechnung','Dreiecksregel'], a: 1 },
          { q: 'Kräfte sind Vektoren weil...', opts: ['Sie immer groß sind','Sie Betrag und Richtung haben','Sie skalare Größen sind','Sie immer senkrecht stehen'], a: 1 }
        ]
      },
      {
        id: 'wurfbewegung',
        name: 'Schiefer Wurf',
        icon: '🎯',
        section: 'mechanik',
        intro: 'Beim <strong>schiefen Wurf</strong> überlagern sich gleichförmige Horizontalbewegung (v_x = konst.) und freier Fall (g = 9,81 m/s²). Die Bahn ist eine <strong>Parabel</strong>.',
        merkbox: [
          'x-Richtung: v_x = v₀·cos(α) = konstant',
          'y-Richtung: v_y = v₀·sin(α) − g·t (freier Fall)',
          'Wurfweite: W = v₀²·sin(2α)/g',
          'Maximale Wurfweite bei α = 45°'
        ],
        deepTitle: 'Schiefer Wurf — tiefer betrachtet',
        deep: '<div class="physik-formel">x(t) = v₀·cos(α)·t</div><div class="physik-formel">y(t) = v₀·sin(α)·t − ½·g·t²</div><h4>Maximale Wurfweite</h4><p>Wurfweite W = v₀²·sin(2α)/g. Maximum bei α = 45° (sin(90°) = 1).</p><h4>Überlagerungsprinzip</h4><p>Horizontale und vertikale Bewegung sind unabhängig voneinander — man kann sie getrennt berechnen und dann überlagern.</p>',
        canvas: 'c-phys-wurf',
        canvasW: 500, canvasH: 240,
        drawFn: 'drawWurfPhys',
        controls: [
          { type: 'range', id: 'phys-wurf-alpha', label: 'Winkel α', valId: 'phys-wurf-alpha-val', min: 10, max: 80, value: 45, unit: '°', fn: 'resetWurfPhys' },
          { type: 'range', id: 'phys-wurf-v0', label: 'Anfangsgeschwindigkeit v₀', valId: 'phys-wurf-v0-val', min: 10, max: 50, value: 20, unit: ' m/s', fn: 'resetWurfPhys' },
          { type: 'button', label: '▶ Play', id: 'phys-wurf-play-btn', fn: 'toggleWurfPhys' }
        ],
        quiz: [
          { q: 'Welche Form hat die Bahn beim schiefen Wurf?', opts: ['Gerade','Kreis','Parabel','Ellipse'], a: 2 },
          { q: 'Bei welchem Winkel ist Wurfweite maximal?', opts: ['30°','60°','90°','45°'], a: 3 },
          { q: 'v_x beim schiefen Wurf ist...', opts: ['Konstant','Steigend','Fallend','Null'], a: 0 },
          { q: 'Welche Kraft wirkt in y-Richtung?', opts: ['Keine','Erdanziehung g','Anfangskraft v₀','Luftwiderstand'], a: 1 },
          { q: 'Wurfweite W = v₀²·sin(2α)/g. Bei α=45°: sin(2·45°)=', opts: ['0','0,5','1','0,87'], a: 2 },
          { q: 'Horizontal und vertikal beim Wurf sind...', opts: ['Abhängig voneinander','Identisch','Unabhängig voneinander','Gleich groß'], a: 2 }
        ]
      }
    ]
  }
};


// ========================
// EXAM GENERATORS
// Aufgaben-Generatoren für den Schulaufgabenmodus
// Jedes Array enthält Funktionen, die {problem, solution, hint, unit, isFreetext?, synonyms?} zurückgeben
// ========================
const EXAM_GENERATORS = {

  // ---- PHYSIK: OPTIK ----
  'lichtausbreitung': [
    () => ({ problem: 'Mit welcher Geschwindigkeit breitet sich Licht im Vakuum aus? (in km/s)', solution: 300000, hint: 'Lichtgeschwindigkeit c = 300.000 km/s', unit: 'km/s' }),
    () => ({ problem: 'Was versteht man unter "geradliniger Ausbreitung" des Lichts?', solution: 'geradlinig', hint: 'Licht folgt einer geraden Linie', unit: '', isFreetext: true, synonyms: ['gerade linie', 'gerader weg', 'straight line', 'gerade ausbreitung'] }),
    () => { const t = (Math.random() * 3 + 1).toFixed(0); return { problem: `Licht legt in ${t} Sekunden wie viele km zurück? (c = 300.000 km/s)`, solution: 300000 * parseInt(t), hint: 's = c · t = 300.000 · ' + t, unit: 'km' }; }
  ],

  'reflexion': [
    () => { const a = Math.floor(Math.random()*80)+5; return { problem: `Ein Lichtstrahl trifft eine Spiegelfläche mit einem Einfallswinkel von ${a}°. Wie groß ist der Ausfallswinkel?`, solution: a, hint: 'Reflexionsgesetz: Einfallswinkel = Ausfallswinkel', unit: '°' }; },
    () => { const a = Math.floor(Math.random()*80)+5; return { problem: `Licht fällt mit ${a}° auf einen Spiegel. Wie groß ist der Winkel zwischen einfallendem und reflektiertem Strahl?`, solution: 2*a, hint: 'Gesamtwinkel = 2 · Einfallswinkel', unit: '°' }; },
    () => ({ problem: 'Was ist das Einfallslot?', solution: 'senkrechte', hint: 'Senkrechte zur Oberfläche im Auftreffpunkt', unit: '', isFreetext: true, synonyms: ['normale', 'senkrecht zur oberfläche', 'normalen'] })
  ],

  'brechung': [
    () => { const alpha = Math.floor(Math.random()*40)+10; const beta = Math.round(Math.asin(1.0/1.5 * Math.sin(alpha * Math.PI/180)) * 180/Math.PI); return { problem: `Licht tritt von Luft (n=1,0) in Glas (n=1,5) über. Einfallswinkel: ${alpha}°. Wie groß ist der Brechungswinkel? (ganze Grad)`, solution: beta, hint: `Snell: sin(β) = sin(${alpha}°)/1,5`, unit: '°' }; },
    () => ({ problem: 'In welche Richtung wird Licht gebrochen, wenn es von Luft in Wasser übergeht?', solution: 'zum lot hin', hint: 'Beim Übergang in optisch dichteres Medium: zum Lot hin', unit: '', isFreetext: true, synonyms: ['zur normalen', 'zum einfallslot', 'richtung lot', 'lot hin', 'zum lot'] }),
    () => ({ problem: 'Was gibt der Brechungsindex n an?', solution: 'Verhältnis der Lichtgeschwindigkeiten in zwei Medien', hint: 'n = c_Luft / c_Medium', unit: '', isFreetext: true, synonyms: ['lichtgeschwindigkeit', 'verhältnis geschwindigkeiten', 'n = c/c'] })
  ],

  'totalreflexion': [
    () => { const n = 1.5; const grenz = Math.round(Math.asin(1/n) * 180/Math.PI); return { problem: `Glas hat n = 1,5. Ab welchem Grenzwinkel tritt Totalreflexion auf? (ganze Grad)`, solution: grenz, hint: 'sin(Grenzwinkel) = 1/n → arcsin(1/1,5)', unit: '°' }; },
    () => ({ problem: 'Wann tritt Totalreflexion auf?', solution: 'wenn der einfallswinkel größer als der grenzwinkel ist', hint: 'Licht muss vom dichteren ins dünnere Medium übergehen', unit: '', isFreetext: true, synonyms: ['grenzwinkel überschritten', 'einfallswinkel größer grenzwinkel'] }),
    () => ({ problem: 'Nenne eine technische Anwendung der Totalreflexion.', solution: 'Glasfaser', hint: 'Datenübertragung mit Licht', unit: '', isFreetext: true, synonyms: ['lichtleiter', 'fiberoptik', 'fiber', 'glasfaserkabel', 'lichtleitfaser'] })
  ],

  'linsen': [
    () => { const f = [10,15,20][Math.floor(Math.random()*3)]; const g = f + Math.floor(Math.random()*20)+10; const b = Math.round(1/(1/f - 1/g)); return { problem: `Eine Sammellinse hat f = ${f} cm. Der Gegenstand steht bei g = ${g} cm. Wo liegt das Bild? (b in cm)`, solution: b, hint: '1/f = 1/g + 1/b → b = f·g/(g-f)', unit: 'cm' }; },
    () => ({ problem: 'Was ist der Unterschied zwischen Sammellinse und Zerstreuungslinse?', solution: 'Sammellinse bündelt Licht', hint: 'Sammellinse: konvex; Zerstreuungslinse: konkav', unit: '', isFreetext: true, synonyms: ['bündelt', 'konvex', 'sammellinse bündelt licht'] }),
    () => ({ problem: 'Was ist die Brennweite einer Linse?', solution: 'Abstand zwischen Linse und Brennpunkt', hint: 'Parallele Strahlen treffen sich im Brennpunkt', unit: '', isFreetext: true, synonyms: ['brennpunkt abstand', 'fokus', 'abstand linse brennpunkt'] })
  ],

  'auge': [
    () => ({ problem: 'Welcher Teil des Auges entspricht einer Sammellinse?', solution: 'Augenlinse', hint: 'Bündelt Licht auf die Netzhaut', unit: '', isFreetext: true, synonyms: ['linse', 'kristallinse', 'die linse'] }),
    () => ({ problem: 'Wo muss das scharfe Bild beim normalsichtigen Auge entstehen?', solution: 'auf der Netzhaut', hint: 'Retina = Netzhaut', unit: '', isFreetext: true, synonyms: ['netzhaut', 'retina', 'auf der retina'] }),
    () => ({ problem: 'Welche Fehlsichtigkeit wird durch eine Zerstreuungslinse korrigiert?', solution: 'Kurzsichtigkeit', hint: 'Myopie: Bild entsteht vor der Netzhaut', unit: '', isFreetext: true, synonyms: ['myopie', 'kurzsichtig', 'myop'] })
  ],

  // ---- PHYSIK: MECHANIK ----
  'geschwindigkeit': [
    () => { const v = Math.floor(Math.random()*80)+20, t = Math.floor(Math.random()*4)+1; return { problem: `Ein Auto fährt ${t} Stunden mit v = ${v} km/h. Wie weit kommt es?`, solution: v*t, hint: 's = v · t', unit: 'km' }; },
    () => { const s = (Math.floor(Math.random()*10)+2)*10, t = Math.floor(Math.random()*4)+1; return { problem: `Ein Radfahrer legt ${s} km in ${t} Stunde(n) zurück. Wie schnell fährt er?`, solution: Math.round(s/t), hint: 'v = s / t', unit: 'km/h' }; },
    () => { const v = Math.floor(Math.random()*60)+30, k = (Math.floor(Math.random()*5)+1); const s = v*k; return { problem: `Ein Zug fährt ${s} km mit v = ${v} km/h. Wie lange braucht er?`, solution: k, hint: 't = s / v', unit: 'h' }; }
  ],

  'diagramme': [
    () => ({ problem: 'Was zeigt die Steigung im s-t-Diagramm (Weg-Zeit-Diagramm)?', solution: 'Geschwindigkeit', hint: 'Δs / Δt = Geschwindigkeit', unit: '', isFreetext: true, synonyms: ['die geschwindigkeit', 'v', 'v=s/t'] }),
    () => ({ problem: 'Was bedeutet eine waagerechte Gerade im v-t-Diagramm?', solution: 'konstante geschwindigkeit', hint: 'v = const → keine Beschleunigung', unit: '', isFreetext: true, synonyms: ['gleichförmige bewegung', 'keine beschleunigung', 'gleichmäßig', 'gleichförmig'] }),
    () => ({ problem: 'Was gibt die Fläche unter dem v-t-Diagramm an?', solution: 'zurückgelegter Weg', hint: 'Fläche = v · t = s', unit: '', isFreetext: true, synonyms: ['weg', 'strecke', 'der weg', 'die strecke'] })
  ],

  'newton': [
    () => { const m = Math.floor(Math.random()*50)+10, a = Math.floor(Math.random()*5)+1; return { problem: `Eine Masse von ${m} kg wird mit a = ${a} m/s² beschleunigt. Wie groß ist die Kraft?`, solution: m*a, hint: 'F = m · a', unit: 'N' }; },
    () => { const F = (Math.floor(Math.random()*10)+2)*10, m = Math.floor(Math.random()*10)+5; return { problem: `F = ${F} N, m = ${m} kg. Wie groß ist die Beschleunigung?`, solution: parseFloat((F/m).toFixed(2)), hint: 'a = F / m', unit: 'm/s²' }; },
    () => ({ problem: 'Formuliere Newtons 3. Gesetz (Actio = Reactio).', solution: 'jede kraft hat eine gleich große entgegengesetzte gegenkraft', hint: 'Kräfte treten immer paarweise auf', unit: '', isFreetext: true, synonyms: ['actio reactio', 'gegenkraft', 'gleich groß entgegengesetzt', 'wechselwirkung'] })
  ],

  'vektoren': [
    () => { const F1 = Math.floor(Math.random()*30)+10, F2 = Math.floor(Math.random()*30)+10; return { problem: `Zwei Kräfte F₁ = ${F1} N und F₂ = ${F2} N wirken in die gleiche Richtung. Wie groß ist die Resultierende?`, solution: F1+F2, hint: 'Gleiche Richtung → addieren', unit: 'N' }; },
    () => { const F1 = Math.floor(Math.random()*30)+20, F2 = Math.floor(Math.random()*15)+5; return { problem: `Zwei Kräfte entgegengesetzt: F₁ = ${F1} N, F₂ = ${F2} N. Wie groß ist die Resultierende?`, solution: F1-F2, hint: 'Entgegengesetzt → subtrahieren', unit: 'N' }; },
    () => ({ problem: 'Wie heißt die Summe aller Kräfte, die auf einen Körper wirken?', solution: 'Resultierende', hint: 'Vektoraddition aller Kräfte', unit: '', isFreetext: true, synonyms: ['resultierende kraft', 'gesamtkraft', 'nettokraft'] })
  ],

  'wurfbewegung': [
    () => ({ problem: 'Welche Bahnkurve beschreibt ein schräg geworfener Körper (ohne Luftwiderstand)?', solution: 'Parabel', hint: 'Horizontale Gleichbewegung + vertikaler freier Fall', unit: '', isFreetext: true, synonyms: ['parabelförmig', 'parabolisch', 'halbparabel'] }),
    () => { const v0 = Math.floor(Math.random()*20)+10; return { problem: `Ball: v₀ = ${v0} m/s, α = 45°, g = 10 m/s². Wurfweite W = v₀²/g = ?`, solution: Math.round(v0*v0/10), hint: 'W = v₀² · sin(90°) / g = v₀²/g', unit: 'm' }; },
    () => ({ problem: 'Was passiert mit der horizontalen Geschwindigkeit beim schiefen Wurf (ohne Luftwiderstand)?', solution: 'sie bleibt konstant', hint: 'Horizontal wirkt keine Kraft', unit: '', isFreetext: true, synonyms: ['konstant', 'ändert sich nicht', 'bleibt gleich', 'unveränderlich'] })
  ],

  // ---- MATHE ----
  'funktionen': [
    () => { const a = Math.floor(Math.random()*5)+1, b = Math.floor(Math.random()*10)-5, x = Math.floor(Math.random()*6)+1; return { problem: `Berechne f(${x}) für f(x) = ${a}x + (${b})`, solution: a*x+b, hint: `Einsetzen: ${a}·${x} + (${b})`, unit: '' }; },
    () => { const a = Math.floor(Math.random()*5)+1, b = Math.floor(Math.random()*10)-5; return { problem: `Bestimme die Nullstelle von f(x) = ${a}x + (${b})`, solution: parseFloat((-b/a).toFixed(2)), hint: `f(x) = 0 → ${a}x = ${-b} → x = ${(-b/a).toFixed(2)}`, unit: '' }; },
    () => ({ problem: 'Was ist der Unterschied zwischen Definitions- und Wertemenge?', solution: 'definitionsmenge: x-werte, wertemenge: y-werte', hint: 'D = x-Werte, W = y-Werte', unit: '', isFreetext: true, synonyms: ['x werte y werte', 'definitionsmenge x wertemenge y', 'domain range'] })
  ],

  'lineare-funktionen': [
    () => { const m = Math.floor(Math.random()*6)-3, b = Math.floor(Math.random()*10)-5; return { problem: `Wie lautet die Steigung der Funktion f(x) = ${m}x + (${b})?`, solution: m, hint: 'f(x) = mx + b → Steigung = m', unit: '' }; },
    () => { const m = Math.floor(Math.random()*6)-3||1, b = Math.floor(Math.random()*10)-5; return { problem: `Bestimme den y-Achsenabschnitt von f(x) = ${m}x + (${b})`, solution: b, hint: 'y-Achsenabschnitt = b (bei x=0)', unit: '' }; },
    () => { const m = Math.floor(Math.random()*4)+1; return { problem: `Sind f(x) = ${m}x + 2 und g(x) = ${m+1}x - 1 parallel? (ja/nein)`, solution: 'nein', hint: 'Parallel wenn Steigungen gleich sind', unit: '', isFreetext: true, synonyms: [] }; }
  ],

  'bruchterme': [
    () => { const a = Math.floor(Math.random()*5)+2, b = Math.floor(Math.random()*5)+1; return { problem: `Vereinfache: (${a*b}x) / (${b})`, solution: `${a}x`, hint: `${b} kürzen`, unit: '' }; },
    () => { const p = Math.floor(Math.random()*4)+1, q = Math.floor(Math.random()*4)+1; return { problem: `Berechne: ${p}/8 + ${q}/8`, solution: `${p+q}/8`, hint: 'Gleicher Nenner → Zähler addieren', unit: '' }; },
    () => ({ problem: 'Wann darf man im Bruchterm kürzen?', solution: 'wenn zähler und nenner den gleichen faktor haben', hint: 'Nur Faktoren (nicht Summanden) kürzen!', unit: '', isFreetext: true, synonyms: ['gemeinsamer faktor', 'teiler', 'gleiche faktoren'] })
  ],

  'laplace': [
    () => { const k = Math.floor(Math.random()*6)+1; return { problem: `Ein fairer Würfel (6 Seiten) wird geworfen. P(${k}) = ? (als Bruch, z.B. 1/6)`, solution: '1/6', hint: 'P = günstige / alle = 1/6', unit: '' }; },
    () => { const n = 10, k = Math.floor(Math.random()*3)+1; return { problem: `Urne: 10 Kugeln, ${k} rot. Wie groß ist P(rot)? (als Bruch)`, solution: `${k}/10`, hint: `P = ${k}/10`, unit: '' }; },
    () => ({ problem: 'Was ist die Summe aller Wahrscheinlichkeiten eines Wahrscheinlichkeitsraums?', solution: '1', hint: 'P(gesamter Raum) = 1 = 100%', unit: '' })
  ],

  'lgs': [
    () => { const a=Math.floor(Math.random()*4)+1, b=Math.floor(Math.random()*4)+1; const x=2,y=1; return { problem: `Löse das LGS: ${a}x + ${b}y = ${a*2+b*1} und x - y = 1. Wie groß ist x?`, solution: 2, hint: 'Einsetz- oder Additionsverfahren', unit: '' }; },
    () => ({ problem: 'Welche Lösungsmethoden gibt es für ein LGS?', solution: 'Einsetzverfahren, Gleichsetzverfahren, Additionsverfahren', hint: 'Drei Methoden', unit: '', isFreetext: true, synonyms: ['einsetzen gleichsetzen addieren', 'einsetzverfahren', 'additionsverfahren'] }),
    () => { const m=Math.floor(Math.random()*3)+1, b=Math.floor(Math.random()*6)-3; return { problem: `f(x) = ${m}x + ${b} und g(x) = ${m+1}x - 1 schneiden sich bei x = ?`, solution: b+1, hint: `${m}x + ${b} = ${m+1}x - 1 → ${b}+1 = x`, unit: '' }; }
  ],

  // ---- BIOLOGIE ----
  'nervensystem': [
    () => ({ problem: 'Welches Zellorganell ist für die Energiegewinnung in Nervenzellen zuständig?', solution: 'Mitochondrien', hint: 'ATP-Produktion', unit: '', isFreetext: true, synonyms: ['mitochondrium', 'mitochondrien'] }),
    () => ({ problem: 'Wie nennt man den langen Fortsatz einer Nervenzelle, der Signale weiterleitet?', solution: 'Axon', hint: 'Langer Ausläufer der Nervenzelle', unit: '', isFreetext: true, synonyms: ['nervenfaser', 'axon'] }),
    () => ({ problem: 'Was ist eine Synapse?', solution: 'Kontaktstelle zwischen zwei Nervenzellen', hint: 'Übergangsbereich zwischen Nerven', unit: '', isFreetext: true, synonyms: ['verbindung nervenzellen', 'kontaktstelle', 'signalübertragung zwischen nervenzellen'] })
  ],

  'genetik': [
    () => ({ problem: 'Welche Nukleotidbasen sind in der DNA enthalten? (4 Basen nennen)', solution: 'Adenin, Thymin, Guanin, Cytosin', hint: 'A-T und G-C Paare', unit: '', isFreetext: true, synonyms: ['adenin thymin guanin cytosin', 'a t g c', 'atgc'] }),
    () => ({ problem: 'Was ist der Unterschied zwischen Genotyp und Phänotyp?', solution: 'Genotyp: genetische Information; Phänotyp: äußeres Erscheinungsbild', hint: 'Genotyp = Gene, Phänotyp = Merkmal', unit: '', isFreetext: true, synonyms: ['genotyp gene phänotyp erscheinung', 'erbgut merkmal'] }),
    () => ({ problem: 'Was ist ein dominantes Allel?', solution: 'Ein Allel das sich gegenüber dem rezessiven durchsetzt', hint: 'Dominant = setzt sich durch', unit: '', isFreetext: true, synonyms: ['setzt sich durch', 'überdeckt rezessives', 'dominant'] })
  ],

  'evolution': [
    () => ({ problem: 'Wer formulierte die Evolutionstheorie durch natürliche Selektion?', solution: 'Charles Darwin', hint: 'Englischer Naturforscher, 19. Jahrhundert', unit: '', isFreetext: true, synonyms: ['darwin', 'charles darwin'] }),
    () => ({ problem: 'Was versteht man unter natürlicher Selektion?', solution: 'Individuen mit vorteilhaften Merkmalen überleben und pflanzen sich häufiger fort', hint: 'Survival of the fittest', unit: '', isFreetext: true, synonyms: ['selektion', 'überleben der stärksten', 'anpassung', 'fitness'] }),
    () => ({ problem: 'Was sind homologe Organe?', solution: 'Organe mit gleichem Grundbauplan aber unterschiedlicher Funktion', hint: 'Gleicher Ursprung, verschiedene Funktion', unit: '', isFreetext: true, synonyms: ['gleicher ursprung', 'homolog', 'arm flosse'] })
  ],

  'oekologie': [
    () => ({ problem: 'Was ist eine Nahrungskette? Nenne ein Beispiel.', solution: 'Reihe von Organismen jeder ernährt sich vom vorherigen; z.B. Pflanze → Hase → Fuchs', hint: 'Produzent → Konsument I → Konsument II', unit: '', isFreetext: true, synonyms: ['nahrungskette', 'pflanze hase fuchs', 'produzent konsument'] }),
    () => ({ problem: 'Was unterscheidet Produzenten von Konsumenten?', solution: 'Produzenten stellen Nährstoffe durch Fotosynthese her; Konsumenten fressen andere Organismen', hint: 'Pflanzen = Produzenten, Tiere = Konsumenten', unit: '', isFreetext: true, synonyms: ['pflanzen fotosynthese tiere fressen', 'autotroph heterotroph'] }),
    () => ({ problem: 'Was ist ein Ökosystem?', solution: 'Gesamtheit aller Lebewesen (Biozönose) und ihrer unbelebten Umwelt (Biotop)', hint: 'Biozönose + Biotop = Ökosystem', unit: '', isFreetext: true, synonyms: ['biozönose biotop', 'lebewesen und umwelt', 'lebensgemeinschaft und lebensraum'] })
  ],

  // ---- CHEMIE ----
  'atombau': [
    () => { const elements = [{z:1,name:'Wasserstoff'},{z:6,name:'Kohlenstoff'},{z:8,name:'Sauerstoff'},{z:7,name:'Stickstoff'}]; const el = elements[Math.floor(Math.random()*elements.length)]; return { problem: `${el.name} hat die Ordnungszahl ${el.z}. Wie viele Protonen hat ein ${el.name}-Atom?`, solution: el.z, hint: 'Ordnungszahl = Protonenzahl', unit: '' }; },
    () => ({ problem: 'Was befindet sich im Atomkern?', solution: 'Protonen und Neutronen', hint: 'Elektronen sind außen', unit: '', isFreetext: true, synonyms: ['protonen neutronen', 'nukleonen', 'kernteilchen'] }),
    () => ({ problem: 'Was ist die Massenzahl eines Atoms?', solution: 'Protonenzahl plus Neutronenzahl', hint: 'A = Z + N', unit: '', isFreetext: true, synonyms: ['protonen + neutronen', 'a = z + n', 'kernteilchen zusammen'] })
  ],

  'pse': [
    () => ({ problem: 'In welcher Gruppe des PSE stehen die Edelgase?', solution: '8. Hauptgruppe', hint: 'Ganz rechts im PSE, Gruppe 18', unit: '', isFreetext: true, synonyms: ['gruppe 18', 'viii', 'achte hauptgruppe', '8. hauptgruppe'] }),
    () => ({ problem: 'Was gibt die Periode (Zeile) im PSE an?', solution: 'Anzahl der besetzten Elektronenschalen', hint: 'Periode 2 → 2 Schalen', unit: '', isFreetext: true, synonyms: ['elektronenschalen', 'schalen', 'anzahl schalen'] }),
    () => ({ problem: 'Wie heißt das Element mit der Ordnungszahl 6?', solution: 'Kohlenstoff', hint: 'C im PSE', unit: '', isFreetext: true, synonyms: ['c', 'carbon'] })
  ],

  'bindungen': [
    () => ({ problem: 'Was ist eine kovalente Bindung?', solution: 'Gemeinsame Elektronenpaare zwischen zwei Nichtmetall-Atomen', hint: 'Elektronen werden geteilt', unit: '', isFreetext: true, synonyms: ['atombindung', 'elektronenpaar', 'gemeinsame elektronen', 'nichtmetalle'] }),
    () => ({ problem: 'Was entsteht bei einer Ionenbindung?', solution: 'Ionen (Kationen und Anionen) die sich anziehen', hint: 'Metall gibt Elektronen ab → Kation; Nichtmetall nimmt auf → Anion', unit: '', isFreetext: true, synonyms: ['ionen', 'kation anion', 'elektrostatisch'] }),
    () => ({ problem: 'Zwischen welchen Stoffen tritt die Metallbindung auf?', solution: 'Zwischen Metallatomen (Elektronengasmodell)', hint: 'Delokalisierte Elektronen im Metallgitter', unit: '', isFreetext: true, synonyms: ['metalle', 'metallatome', 'elektronengas'] })
  ],

  'reaktionen': [
    () => ({ problem: 'Was versteht man unter dem Gesetz der Erhaltung der Masse?', solution: 'Masse der Edukte gleich Masse der Produkte', hint: 'Masse vor = Masse nach der Reaktion', unit: '', isFreetext: true, synonyms: ['masse bleibt erhalten', 'edukte gleich produkte', 'massenerhaltung'] }),
    () => ({ problem: 'Was sind Edukte und Produkte?', solution: 'Edukte: Ausgangsstoffe; Produkte: entstehende Stoffe', hint: 'Edukte → Produkte (Pfeil)', unit: '', isFreetext: true, synonyms: ['ausgangsstoffe endprodukte', 'reaktanten', 'edukt ausgangsstoff'] }),
    () => ({ problem: 'Was ist eine Oxidation?', solution: 'Aufnahme von Sauerstoff oder Abgabe von Elektronen', hint: 'Oxidation = Sauerstoffaufnahme oder e⁻-Abgabe', unit: '', isFreetext: true, synonyms: ['sauerstoffaufnahme', 'elektronenabgabe', 'sauerstoff aufnehmen'] })
  ],

  // ---- GESCHICHTE ----
  'revolution-1789': [
    () => ({ problem: 'In welchem Jahr begann die Französische Revolution?', solution: '1789', hint: 'Sturm auf die Bastille am 14. Juli', unit: '', isFreetext: true, synonyms: ['1789'] }),
    () => ({ problem: 'Welche drei Stände gab es im vorrevolutionären Frankreich?', solution: 'Klerus, Adel, Dritter Stand', hint: 'Klerus, Adel, Bürgertum/Volk', unit: '', isFreetext: true, synonyms: ['klerus adel bürgertum', 'geistliche adel volk', 'drei stände'] }),
    () => ({ problem: 'Was bedeutet der Dreiklang der Französischen Revolution?', solution: 'Freiheit, Gleichheit, Brüderlichkeit', hint: 'Liberté, Égalité, Fraternité', unit: '', isFreetext: true, synonyms: ['freiheit gleichheit brüderlichkeit', 'liberte egalite fraternite'] })
  ],

  'restauration-1848': [
    () => ({ problem: 'Was versteht man unter Restauration (nach 1815)?', solution: 'Wiederherstellung der alten monarchischen Ordnung nach den napoleonischen Kriegen', hint: 'Nach dem Wiener Kongress 1815', unit: '', isFreetext: true, synonyms: ['monarchie wiederherstellen', 'alte ordnung', 'wiener kongress'] }),
    () => ({ problem: 'Was war das Hambacher Fest (1832)?', solution: 'Großes Volksfest mit politischen Forderungen nach Einheit und Freiheit in Deutschland', hint: 'Erste große demokratische Massenveranstaltung in Deutschland', unit: '', isFreetext: true, synonyms: ['hambacher', 'demokratie freiheit einheit 1832', 'volksversammlung'] }),
    () => ({ problem: 'Was forderten die Revolutionäre von 1848 in Deutschland?', solution: 'Nationale Einheit, Verfassung, Bürgerrechte und demokratische Mitbestimmung', hint: 'Märzrevolution 1848', unit: '', isFreetext: true, synonyms: ['einheit verfassung freiheit', 'grundrechte', 'demokratie'] })
  ],

  'industrialisierung': [
    () => ({ problem: 'Was war die wichtigste Erfindung der frühen Industrialisierung?', solution: 'Die Dampfmaschine', hint: 'James Watt, 1769 – mechanische Kraft durch Dampf', unit: '', isFreetext: true, synonyms: ['dampfmaschine', 'dampf', 'james watt'] }),
    () => ({ problem: 'Was versteht man unter dem Proletariat?', solution: 'Lohnabhängige Arbeiterklasse ohne Eigentum an Produktionsmitteln', hint: 'Fabrikarbeiter im 19. Jahrhundert', unit: '', isFreetext: true, synonyms: ['arbeiterklasse', 'arbeiter', 'lohnarbeiter'] }),
    () => ({ problem: 'Was waren typische Merkmale der Arbeitsbedingungen im 19. Jahrhundert?', solution: 'Lange Arbeitszeiten, Kinderarbeit, niedrige Löhne, gefährliche Bedingungen', hint: 'Vor der Arbeiterbewegung', unit: '', isFreetext: true, synonyms: ['lange arbeitszeiten kinderarbeit', 'schlechte bedingungen', 'ausbeutung'] })
  ],

  'kaiserreich': [
    () => ({ problem: 'Wann wurde das Deutsche Kaiserreich gegründet?', solution: '1871', hint: 'Proklamation in Versailles', unit: '', isFreetext: true, synonyms: ['1871'] }),
    () => ({ problem: 'Wer war der erste deutsche Kaiser?', solution: 'Wilhelm I.', hint: 'Preußischer König', unit: '', isFreetext: true, synonyms: ['wilhelm i', 'wilhelm der erste', 'kaiser wilhelm'] }),
    () => ({ problem: 'Wer war der erste Reichskanzler des Deutschen Kaiserreichs?', solution: 'Otto von Bismarck', hint: 'Der eiserne Kanzler', unit: '', isFreetext: true, synonyms: ['bismarck', 'otto bismarck', 'von bismarck'] })
  ],

  // ---- GEOGRAPHIE ----
  'disparitaeten': [
    () => ({ problem: 'Was sind Disparitäten in der Geographie?', solution: 'Räumliche Unterschiede im wirtschaftlichen Entwicklungsstand zwischen Regionen', hint: 'Nord-Süd-Gefälle, Arm-Reich-Unterschiede', unit: '', isFreetext: true, synonyms: ['unterschiede entwicklung', 'ungleichheit', 'entwicklungsunterschiede'] }),
    () => ({ problem: 'Was ist der HDI (Human Development Index)?', solution: 'Index zur Messung menschlicher Entwicklung: Lebenserwartung, Bildung, Einkommen', hint: 'UNDP-Kennzahl für Lebensqualität', unit: '', isFreetext: true, synonyms: ['human development index', 'lebenserwartung bildung einkommen', 'entwicklungsindex'] }),
    () => ({ problem: 'Was versteht man unter globalem Süden?', solution: 'Länder mit geringerem wirtschaftlichen Entwicklungsstand', hint: 'Entwicklungsländer, emerging markets', unit: '', isFreetext: true, synonyms: ['entwicklungsländer', 'südhalbkugel', 'less developed'] })
  ],

  'bevoelkerung': [
    () => ({ problem: 'Was ist der demografische Übergang?', solution: 'Modell des Übergangs von hohen Geburten- und Sterberaten zu niedrigen Raten', hint: '4-Phasen-Modell', unit: '', isFreetext: true, synonyms: ['phasen modell bevölkerungswachstum', 'geburtenrate sterberate', 'demografischer wandel'] }),
    () => ({ problem: 'Wie viel Menschen leben derzeit auf der Erde? (Milliarden, gerundet)', solution: '8', hint: 'Ca. 8 Milliarden', unit: 'Milliarden' }),
    () => ({ problem: 'In welchen Regionen wächst die Bevölkerung derzeit am stärksten?', solution: 'Afrika', hint: 'Hohe Geburtenraten bei sinkender Kindersterblichkeit', unit: '', isFreetext: true, synonyms: ['subsahara', 'entwicklungsländer', 'afrika asien'] })
  ],

  'klimazonen': [
    () => ({ problem: 'Wie viele Klimazonen gibt es (nach dem klassischen Modell)?', solution: '5', hint: 'Tropisch, Subtropisch, Gemäßigt, Kalt, Polar', unit: '' }),
    () => ({ problem: 'Was charakterisiert das tropische Klima?', solution: 'Ganzjährig hohe Temperaturen und hohe Niederschläge', hint: 'Immergrüner Regenwald', unit: '', isFreetext: true, synonyms: ['heiß feucht', 'regenwald', 'hohe temperaturen niederschläge'] }),
    () => ({ problem: 'Was sind Haupteinflussfaktoren auf das Klima einer Region?', solution: 'Breitengrad, Höhe, Meeresströmungen, Entfernung vom Meer', hint: 'Geographische Lage, Relief, ozeanische Einflüsse', unit: '', isFreetext: true, synonyms: ['breitengrad meeresströmung', 'lage höhe meer', 'klimafaktoren'] })
  ],

  'energie-rohstoffe': [
    () => ({ problem: 'Welche fossilen Energieträger gibt es?', solution: 'Kohle, Erdöl, Erdgas', hint: 'Über Millionen Jahre aus organischem Material entstanden', unit: '', isFreetext: true, synonyms: ['kohle öl gas', 'erdöl erdgas kohle', 'fossil fuels'] }),
    () => ({ problem: 'Was ist ein Nachteil erneuerbarer Energien?', solution: 'Wetterabhängigkeit und Speicherproblematik', hint: 'Wind und Sonne sind nicht immer verfügbar', unit: '', isFreetext: true, synonyms: ['nicht immer verfügbar', 'speicher', 'wetterabhängig', 'intermittierend'] }),
    () => ({ problem: 'In welcher Region liegen die größten Erdölreserven?', solution: 'Naher Osten', hint: 'OPEC-Länder, Golfregion', unit: '', isFreetext: true, synonyms: ['golfstaaten', 'saudi arabien', 'opec', 'naher osten'] })
  ],

  // ---- LATEIN ----
  'aci': [
    () => ({ problem: 'Was ist ein AcI (Accusativus cum Infinitivo)?', solution: 'Indirekte Rede: Subjekt im Akkusativ + Infinitiv', hint: 'z.B. "Er sagt, dass sie kommt" → "Er sagt sie kommen"', unit: '', isFreetext: true, synonyms: ['indirekte rede akkusativ infinitiv', 'accusativus cum infinitivo', 'akkusativ infinitiv'] }),
    () => ({ problem: 'Nach welchen Verben wird der AcI im Lateinischen verwendet?', solution: 'Verben des Sagens, Denkens, Fühlens und Wahrnehmens', hint: 'dicere, putare, videre, sentire', unit: '', isFreetext: true, synonyms: ['sagen denken fühlen wahrnehmen', 'dicere putare', 'mentis verba'] }),
    () => ({ problem: 'Übersetze: "Puto eum venire" — was bedeutet "eum"?', solution: 'ihn (Akkusativ von is)', hint: 'is/ea/id → Akk. Mask. = eum', unit: '', isFreetext: true, synonyms: ['ihn', 'akkusativ', 'akk von is'] })
  ],

  'konjunktiv': [
    () => ({ problem: 'Wofür steht der Konjunktiv Imperfekt im Lateinischen?', solution: 'In Gliedsätzen für Gleichzeitigkeit in der Vergangenheit (cum-Sätze, indirekte Frage)', hint: 'KI = gleichzeitig in der Vergangenheit', unit: '', isFreetext: true, synonyms: ['gleichzeitigkeit vergangenheit', 'indirekte frage', 'cum sätze'] }),
    () => ({ problem: 'Welche Endung hat die 1. Person Singular Konjunktiv Präsens Aktiv (1. Konjugation, z.B. amare)?', solution: '-em', hint: 'amem, ames, amet...', unit: '', isFreetext: true, synonyms: ['-em', 'em'] }),
    () => ({ problem: 'Was drückt der Konjunktiv Plusquamperfekt aus?', solution: 'Vorzeitigkeit in der Vergangenheit', hint: 'KPP = etwas war schon vorher passiert', unit: '', isFreetext: true, synonyms: ['vorzeitigkeit', 'vorher', 'vorzeitig vergangenheit'] })
  ],

  'gerundiv': [
    () => ({ problem: 'Was ist ein Gerundivum im Lateinischen?', solution: 'Ein verbales Adjektiv das eine Notwendigkeit ausdrückt ("muss/soll getan werden")', hint: 'Passives Verbalabstraktum, z.B. amanda = die geliebt werden muss', unit: '', isFreetext: true, synonyms: ['verbales adjektiv', 'notwendigkeit', 'muss getan werden', 'passives adjektiv'] }),
    () => ({ problem: 'Welche Endung hat das Gerundivum?', solution: '-ndus/-nda/-ndum', hint: 'z.B. amandus = der geliebt werden muss', unit: '', isFreetext: true, synonyms: ['-ndus', 'ndus nda ndum', '-ndum'] }),
    () => ({ problem: 'Was bedeutet "Carthago delenda est"?', solution: 'Karthago muss zerstört werden', hint: 'delenda (Gerundivum von delere) + est', unit: '', isFreetext: true, synonyms: ['karthago zerstört', 'karthago muss zerstört werden', 'delenda'] })
  ],

  'deponenten': [
    () => ({ problem: 'Was sind Deponenten im Lateinischen?', solution: 'Verben mit passiver Form aber aktiver Bedeutung', hint: 'z.B. loqui = sprechen (nicht: gesprochen werden)', unit: '', isFreetext: true, synonyms: ['passive form aktive bedeutung', 'passiv aktiv', 'passive endung aktiv'] }),
    () => ({ problem: 'Nenne ein bekanntes lateinisches Deponens.', solution: 'loqui (sprechen)', hint: 'Weitere: sequi, uti, loqui, mori', unit: '', isFreetext: true, synonyms: ['loqui', 'sequi', 'uti', 'mori', 'proficisci'] }),
    () => ({ problem: 'Was bedeutet "loqui"?', solution: 'sprechen', hint: 'Deponens: passive Form, aktive Bedeutung', unit: '', isFreetext: true, synonyms: ['reden', 'sagen', 'sprechen'] })
  ]
};
