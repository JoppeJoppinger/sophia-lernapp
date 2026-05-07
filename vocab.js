const LATIN_VOCAB = [
  // ========== LEKTION 51 – Adjektiv-Steigerung (Komparativ/Superlativ) ==========
  {lat:'augere', gen:'auget', de:'vergrößern, vermehren', type:'verb', chapter:51},
  {lat:'minuere', gen:'minuit', de:'vermindern, verkleinern', type:'verb', chapter:51},
  {lat:'praeferre', gen:'praefert', de:'vorziehen, bevorzugen', type:'verb', chapter:51},
  {lat:'superare', gen:'superat', de:'übertreffen, siegen', type:'verb', chapter:51},
  {lat:'aequare', gen:'aequat', de:'gleichmachen, gleichstellen', type:'verb', chapter:51},
  {lat:'pars', gen:'partis f.', de:'Teil, Seite', type:'noun', chapter:51},
  {lat:'modus', gen:'-i m.', de:'Maß, Art, Weise', type:'noun', chapter:51},
  {lat:'forma', gen:'-ae f.', de:'Gestalt, Schönheit, Form', type:'noun', chapter:51},
  {lat:'laus', gen:'laudis f.', de:'Lob, Ruhm', type:'noun', chapter:51},
  {lat:'fama', gen:'-ae f.', de:'Ruf, Gerücht, Nachricht', type:'noun', chapter:51},
  {lat:'copia', gen:'-ae f.', de:'Fülle, Menge; pl. Truppen', type:'noun', chapter:51},
  {lat:'ratio', gen:'-onis f.', de:'Vernunft, Plan, Rechnung', type:'noun', chapter:51},
  {lat:'optimus', gen:'a, um', de:'der beste (Superlativ von bonus)', type:'adj', chapter:51},
  {lat:'pessimus', gen:'a, um', de:'der schlechteste (Superlativ von malus)', type:'adj', chapter:51},
  {lat:'maximus', gen:'a, um', de:'der größte (Superlativ von magnus)', type:'adj', chapter:51},
  {lat:'minimus', gen:'a, um', de:'der kleinste (Superlativ von parvus)', type:'adj', chapter:51},
  {lat:'plurimus', gen:'a, um', de:'sehr viele, die meisten (Superlativ von multus)', type:'adj', chapter:51},
  {lat:'superior', gen:'ius', de:'höher, früher, überlegen', type:'adj', chapter:51},
  {lat:'inferior', gen:'ius', de:'niedriger, geringer', type:'adj', chapter:51},
  {lat:'prior', gen:'prius', de:'der frühere, vordere', type:'adj', chapter:51},
  {lat:'posterior', gen:'ius', de:'der spätere, hintere', type:'adj', chapter:51},

  {lat:'comparare', gen:'comparat', de:'vergleichen, vorbereiten, erwerben', type:'verb', chapter:51},
  {lat:'aequus', gen:'a, um', de:'gleich, eben, gerecht', type:'adj', chapter:51},
  {lat:'similis', gen:'-e', de:'ähnlich, gleich (+Gen./Dat.)', type:'adj', chapter:51},
  {lat:'dissimilis', gen:'-e', de:'unähnlich, verschieden', type:'adj', chapter:51},
  // ========== LEKTION 52 – Unregelmäßige Komparation, Ablativ des Vergleichs ==========
  {lat:'melior', gen:'melius', de:'besser (Komparativ von bonus)', type:'adj', chapter:52},
  {lat:'peior', gen:'peius', de:'schlechter (Komparativ von malus)', type:'adj', chapter:52},
  {lat:'maior', gen:'maius', de:'größer (Komparativ von magnus)', type:'adj', chapter:52},
  {lat:'minor', gen:'minus', de:'kleiner (Komparativ von parvus)', type:'adj', chapter:52},
  {lat:'plus', gen:'pluris', de:'mehr (Komparativ von multus)', type:'adj', chapter:52},
  {lat:'pauci', gen:'ae, a', de:'wenige', type:'adj', chapter:52},
  {lat:'senior', gen:'ius', de:'älter (Komparativ von senex)', type:'adj', chapter:52},
  {lat:'iunior', gen:'ius', de:'jünger (Komparativ von iuvenis)', type:'adj', chapter:52},
  {lat:'senex', gen:'senis m.', de:'Greis, alter Mann', type:'noun', chapter:52},
  {lat:'iuvenis', gen:'-is m.', de:'junger Mann, Jüngling', type:'noun', chapter:52},
  {lat:'vetus', gen:'veteris', de:'alt, althergebracht', type:'adj', chapter:52},
  {lat:'aetas', gen:'-atis f.', de:'Alter, Zeit, Generation', type:'noun', chapter:52},
  {lat:'saeculum', gen:'-i n.', de:'Zeitalter, Jahrhundert, Generation', type:'noun', chapter:52},
  {lat:'magis', gen:'', de:'mehr', type:'adv', chapter:52},
  {lat:'maxime', gen:'', de:'am meisten, besonders', type:'adv', chapter:52},
  {lat:'minus', gen:'', de:'weniger', type:'adv', chapter:52},
  {lat:'minime', gen:'', de:'am wenigsten, keineswegs', type:'adv', chapter:52},
  {lat:'potius', gen:'', de:'lieber, eher, vielmehr', type:'adv', chapter:52},
  {lat:'prius', gen:'', de:'früher, zuerst, eher', type:'adv', chapter:52},
  {lat:'natu maior', gen:'', de:'der Ältere (nach Geburt)', type:'adj', chapter:52},
  {lat:'natu minor', gen:'', de:'der Jüngere (nach Geburt)', type:'adj', chapter:52},
  {lat:'nuper', gen:'', de:'kürzlich, neulich', type:'adv', chapter:52},
  {lat:'olim', gen:'', de:'einst, früher, dereinst', type:'adv', chapter:52},
  {lat:'iam', gen:'', de:'schon, jetzt, bald', type:'adv', chapter:52},
  {lat:'pridem', gen:'', de:'schon lange, längst', type:'adv', chapter:52},

  // ========== LEKTION 53 – Partizip Futur Aktiv (PFA) ==========
  {lat:'expectare', gen:'expectat', de:'erwarten, abwarten', type:'verb', chapter:53},
  {lat:'parare', gen:'parat', de:'vorbereiten, beschaffen', type:'verb', chapter:53},
  {lat:'constituere', gen:'constituit', de:'aufstellen, beschließen, festsetzen', type:'verb', chapter:53},
  {lat:'iungere', gen:'iungit', de:'verbinden, zusammenfügen', type:'verb', chapter:53},
  {lat:'solvere', gen:'solvit', de:'lösen, zahlen, auflösen', type:'verb', chapter:53},
  {lat:'recedere', gen:'recedit', de:'zurückgehen, zurückweichen', type:'verb', chapter:53},
  {lat:'accedere', gen:'accedit', de:'herantreten, hinzukommen', type:'verb', chapter:53},
  {lat:'cedere', gen:'cedit', de:'weichen, gehen, nachgeben', type:'verb', chapter:53},
  {lat:'procedere', gen:'procedit', de:'vorrücken, vorschreiten, vorankommen', type:'verb', chapter:53},
  {lat:'finis', gen:'-is m.', de:'Ende, Grenze, Ziel; pl. Gebiet', type:'noun', chapter:53},
  {lat:'pons', gen:'pontis m.', de:'Brücke', type:'noun', chapter:53},
  {lat:'litus', gen:'-oris n.', de:'Küste, Ufer, Strand', type:'noun', chapter:53},
  {lat:'navis', gen:'-is f.', de:'Schiff', type:'noun', chapter:53},
  {lat:'ventus', gen:'-i m.', de:'Wind', type:'noun', chapter:53},
  {lat:'porta', gen:'-ae f.', de:'Tor, Eingang, Pforte', type:'noun', chapter:53},
  {lat:'arx', gen:'arcis f.', de:'Burg, Zitadelle, Gipfel', type:'noun', chapter:53},
  {lat:'futura', gen:'', de:'die zukünftigen Dinge', type:'noun', chapter:53},
  {lat:'futurus', gen:'a, um', de:'zukünftig (PFA von esse)', type:'adj', chapter:53},

  // ========== LEKTION 54 – Infinitiv Futur Aktiv, AcI Nachzeitigkeit ==========
  {lat:'promittere', gen:'promittit', de:'versprechen, zusagen', type:'verb', chapter:54},
  {lat:'polliceri', gen:'pollicetur', de:'versprechen, in Aussicht stellen', type:'verb', chapter:54},
  {lat:'negare', gen:'negat', de:'verneinen, leugnen, verweigern', type:'verb', chapter:54},
  {lat:'affirmare', gen:'affirmat', de:'bejahen, versichern, bestätigen', type:'verb', chapter:54},
  {lat:'nuntiare', gen:'nuntiat', de:'melden, berichten, ankündigen', type:'verb', chapter:54},
  {lat:'arbitrari', gen:'arbitratur', de:'meinen, glauben (Dep.)', type:'verb', chapter:54},
  {lat:'nuntius', gen:'-ii m.', de:'Bote, Nachricht, Botschaft', type:'noun', chapter:54},
  {lat:'rumor', gen:'-oris m.', de:'Gerücht, Gerede', type:'noun', chapter:54},
  {lat:'opinio', gen:'-onis f.', de:'Meinung, Vermutung, Ansicht', type:'noun', chapter:54},
  {lat:'spes', gen:'spei f.', de:'Hoffnung, Erwartung', type:'noun', chapter:54},
  {lat:'fides', gen:'fidei f.', de:'Treue, Glaube, Vertrauen', type:'noun', chapter:54},
  {lat:'certus', gen:'a, um', de:'sicher, gewiss, bestimmt', type:'adj', chapter:54},
  {lat:'incertus', gen:'a, um', de:'unsicher, ungewiss, unbestimmt', type:'adj', chapter:54},
  {lat:'verus', gen:'a, um', de:'wahr, wirklich', type:'adj', chapter:54},
  {lat:'falsus', gen:'a, um', de:'falsch, irrig, unecht', type:'adj', chapter:54},
  {lat:'pro certo', gen:'', de:'als sicher, mit Sicherheit', type:'adv', chapter:54},
  {lat:'omnino', gen:'', de:'gänzlich, überhaupt, insgesamt', type:'adv', chapter:54},
  {lat:'plane', gen:'', de:'klar, deutlich, völlig', type:'adv', chapter:54},
  {lat:'scire', gen:'scit', de:'wissen, kennen', type:'verb', chapter:54},
  {lat:'ignorare', gen:'ignorat', de:'nicht wissen, ignorieren', type:'verb', chapter:54},
  {lat:'testis', gen:'-is m./f.', de:'Zeuge, Zeugin', type:'noun', chapter:54},
  {lat:'testimonium', gen:'-ii n.', de:'Zeugnis, Beweis', type:'noun', chapter:54},
  {lat:'iurare', gen:'iurat', de:'schwören, einen Eid leisten', type:'verb', chapter:54},
  {lat:'iusiurandum', gen:'iurisiurandi n.', de:'Eid, Schwur', type:'noun', chapter:54},
  {lat:'promissum', gen:'-i n.', de:'Versprechen, Zusage', type:'noun', chapter:54},
  {lat:'mendacium', gen:'-ii n.', de:'Lüge, Unwahrheit', type:'noun', chapter:54},
  {lat:'verum', gen:'-i n.', de:'Wahrheit, das Wahre', type:'noun', chapter:54},
  {lat:'fallere', gen:'fallit', de:'täuschen, irreführen, entgehen', type:'verb', chapter:54},

  // ========== LEKTION 55 – Gerundium ==========
  {lat:'studere', gen:'studet', de:'streben nach, sich befleißigen (+Dat.)', type:'verb', chapter:55},
  {lat:'cupere', gen:'cupit', de:'wünschen, begehren, verlangen', type:'verb', chapter:55},
  {lat:'cogitare', gen:'cogitat', de:'denken, nachdenken, planen', type:'verb', chapter:55},
  {lat:'commemorare', gen:'commemorat', de:'erwähnen, berichten, ins Gedächtnis rufen', type:'verb', chapter:55},
  {lat:'narrare', gen:'narrat', de:'erzählen, berichten', type:'verb', chapter:55},
  {lat:'explicare', gen:'explicat', de:'erklären, entfalten, darlegen', type:'verb', chapter:55},
  {lat:'demonstrare', gen:'demonstrat', de:'zeigen, beweisen, darlegen', type:'verb', chapter:55},
  {lat:'operam dare', gen:'', de:'sich bemühen, sich Mühe geben', type:'verb', chapter:55},
  {lat:'studium', gen:'-ii n.', de:'Eifer, Streben, Studium, Begeisterung', type:'noun', chapter:55},
  {lat:'ars', gen:'artis f.', de:'Kunst, Fähigkeit, Wissenschaft', type:'noun', chapter:55},
  {lat:'opus', gen:'operis n.', de:'Werk, Arbeit, Leistung', type:'noun', chapter:55},
  {lat:'ingenium', gen:'-ii n.', de:'Begabung, Geist, Charakter, Talent', type:'noun', chapter:55},
  {lat:'memoria', gen:'-ae f.', de:'Gedächtnis, Erinnerung, Andenken', type:'noun', chapter:55},
  {lat:'historia', gen:'-ae f.', de:'Geschichte, Erzählung, Bericht', type:'noun', chapter:55},
  {lat:'philosophia', gen:'-ae f.', de:'Philosophie, Weisheitsliebe', type:'noun', chapter:55},
  {lat:'disciplina', gen:'-ae f.', de:'Unterricht, Zucht, Wissenschaft', type:'noun', chapter:55},
  {lat:'liber', gen:'libri m.', de:'Buch', type:'noun', chapter:55},
  {lat:'doctrinae', gen:'-ae f.', de:'Lehre, Wissenschaft, Bildung', type:'noun', chapter:55},
  {lat:'causa', gen:'-ae f.', de:'Ursache, Grund, Sache, Prozess', type:'noun', chapter:55},
  {lat:'gratia', gen:'-ae f.', de:'Gunst, Dankbarkeit; gratia (nach Gen.) – wegen', type:'noun', chapter:55},

  // ========== LEKTION 56 – Konjunktiv HS: Optativ ==========
  {lat:'optare', gen:'optat', de:'wünschen, wählen', type:'verb', chapter:56},
  {lat:'desiderare', gen:'desiderat', de:'vermissen, sich sehnen nach', type:'verb', chapter:56},
  {lat:'gaudere', gen:'gaudet', de:'sich freuen', type:'verb', chapter:56},
  {lat:'dolere', gen:'dolet', de:'schmerzen, leiden, trauern', type:'verb', chapter:56},
  {lat:'mirari', gen:'miratur', de:'sich wundern, bewundern (Dep.)', type:'verb', chapter:56},
  {lat:'oblivisci', gen:'oblivíscitur', de:'vergessen (+Gen./Acc.) (Dep.)', type:'verb', chapter:56},
  {lat:'pati', gen:'patitur', de:'leiden, dulden, erlauben (Dep.)', type:'verb', chapter:56},
  {lat:'deus', gen:'-i m.', de:'Gott', type:'noun', chapter:56},
  {lat:'dea', gen:'-ae f.', de:'Göttin', type:'noun', chapter:56},
  {lat:'templum', gen:'-i n.', de:'Tempel, Heiligtum', type:'noun', chapter:56},
  {lat:'sacerdos', gen:'-otis m./f.', de:'Priester, Priesterin', type:'noun', chapter:56},
  {lat:'pietas', gen:'-atis f.', de:'Pflichtgefühl, Frömmigkeit, Pflichterfüllung', type:'noun', chapter:56},
  {lat:'religio', gen:'-onis f.', de:'Religion, Ehrfurcht, Gewissen', type:'noun', chapter:56},
  {lat:'utinam', gen:'', de:'o dass doch (Wunschpartikel)', type:'conj', chapter:56},
  {lat:'velim', gen:'', de:'ich möchte (Optativ von velle)', type:'verb', chapter:56},
  {lat:'nolim', gen:'', de:'ich möchte nicht (Optativ von nolle)', type:'verb', chapter:56},
  {lat:'divinus', gen:'a, um', de:'göttlich', type:'adj', chapter:56},
  {lat:'sacer', gen:'sacra, sacrum', de:'heilig, geweiht', type:'adj', chapter:56},

  // ========== LEKTION 57 – Hortativ/Jussiv/Prohibitiv, Indefinitpronomina ==========
  {lat:'sinere', gen:'sinit', de:'lassen, erlauben, zulassen', type:'verb', chapter:57},
  {lat:'vetare', gen:'vetat', de:'verbieten, nicht wollen', type:'verb', chapter:57},
  {lat:'imperare', gen:'imperat', de:'befehlen, regieren, herrschen (+Dat.)', type:'verb', chapter:57},
  {lat:'persuadere', gen:'persuadet', de:'überreden, überzeugen (+Dat.)', type:'verb', chapter:57},
  {lat:'hortari', gen:'hortatur', de:'antreiben, ermutigen, auffordern (Dep.)', type:'verb', chapter:57},
  {lat:'adhortari', gen:'adhortatur', de:'anfeuern, ermutigen (Dep.)', type:'verb', chapter:57},
  {lat:'aliquis', gen:'aliquid', de:'jemand, irgend jemand; etwas, irgendetwas', type:'pron', chapter:57},
  {lat:'quidam', gen:'quaedam, quoddam', de:'ein gewisser, ein bestimmter', type:'pron', chapter:57},
  {lat:'quisque', gen:'quaeque, quidque', de:'jeder (einzelne), ein jeder', type:'pron', chapter:57},
  {lat:'quisquam', gen:'quidquam', de:'irgend jemand, überhaupt jemand', type:'pron', chapter:57},
  {lat:'nemo', gen:'neminis', de:'niemand', type:'pron', chapter:57},
  {lat:'nihil', gen:'(indekl.)', de:'nichts', type:'pron', chapter:57},
  {lat:'consilium', gen:'-ii n.', de:'Rat, Plan, Entschluss, Klugheit', type:'noun', chapter:57},
  {lat:'iussum', gen:'-i n.', de:'Befehl, Auftrag', type:'noun', chapter:57},
  {lat:'lex', gen:'legis f.', de:'Gesetz, Bedingung, Regel', type:'noun', chapter:57},
  {lat:'ne', gen:'', de:'nicht (Prohibitiv, Hortativ, Jussiv)', type:'conj', chapter:57},
  {lat:'age', gen:'', de:'wohlan!, auf!, komm!', type:'adv', chapter:57},
  {lat:'agedum', gen:'', de:'wohlan doch!', type:'adv', chapter:57},
  {lat:'fac', gen:'', de:'mach!, sorge dafür! (Jussiv)', type:'verb', chapter:57},
  {lat:'cave', gen:'', de:'hüte dich! (Prohibitiv)', type:'verb', chapter:57},

  // ========== LEKTION 58 – Deponentien a-/e-Konjugation ==========
  {lat:'conari', gen:'conatur', de:'versuchen, sich bemühen', type:'verb', chapter:58},
  {lat:'morari', gen:'moratur', de:'sich aufhalten, zögern, verweilen', type:'verb', chapter:58},
  {lat:'admirari', gen:'admiratur', de:'bewundern, staunen über', type:'verb', chapter:58},
  {lat:'venerari', gen:'veneratur', de:'verehren, anbeten', type:'verb', chapter:58},
  {lat:'polliceri', gen:'pollicetur', de:'versprechen, zusagen', type:'verb', chapter:58},
  {lat:'vereri', gen:'veretur', de:'fürchten, scheuen, ehrerbietig sein', type:'verb', chapter:58},
  {lat:'tueri', gen:'tuetur', de:'schützen, betrachten, bewachen', type:'verb', chapter:58},
  {lat:'fari', gen:'fatur', de:'sprechen, sagen (Dep., defektiv)', type:'verb', chapter:58},
  {lat:'animus', gen:'-i m.', de:'Geist, Seele, Mut, Wille', type:'noun', chapter:58},
  {lat:'mens', gen:'mentis f.', de:'Geist, Verstand, Absicht', type:'noun', chapter:58},
  {lat:'natura', gen:'-ae f.', de:'Natur, Wesen, Beschaffenheit', type:'noun', chapter:58},
  {lat:'fortuna', gen:'-ae f.', de:'Glück, Schicksal, Zufall', type:'noun', chapter:58},
  {lat:'casus', gen:'-us m.', de:'Fall, Zufall, Unglück', type:'noun', chapter:58},
  {lat:'fatum', gen:'-i n.', de:'Schicksal, Verhängnis', type:'noun', chapter:58},
  {lat:'sors', gen:'sortis f.', de:'Los, Schicksal, Zufall', type:'noun', chapter:58},
  {lat:'vita', gen:'-ae f.', de:'Leben', type:'noun', chapter:58},
  {lat:'mors', gen:'mortis f.', de:'Tod', type:'noun', chapter:58},
  {lat:'periculum', gen:'-i n.', de:'Gefahr, Versuch, Prüfung', type:'noun', chapter:58},
  {lat:'virtus', gen:'-tutis f.', de:'Tugend, Tüchtigkeit, Tapferkeit', type:'noun', chapter:58},
  {lat:'sapientia', gen:'-ae f.', de:'Weisheit, Klugheit', type:'noun', chapter:58},

  // ========== LEKTION 59 – Deponentien i-/kons. Konjugation ==========
  {lat:'loqui', gen:'loquitur', de:'sprechen, reden', type:'verb', chapter:59},
  {lat:'sequi', gen:'sequitur', de:'folgen, nachfolgen', type:'verb', chapter:59},
  {lat:'uti', gen:'utitur', de:'benutzen, gebrauchen (+Abl.)', type:'verb', chapter:59},
  {lat:'frui', gen:'fruitur', de:'genießen, sich erfreuen (+Abl.)', type:'verb', chapter:59},
  {lat:'fungi', gen:'fungitur', de:'ausüben, erfüllen, verrichten (+Abl.)', type:'verb', chapter:59},
  {lat:'nasci', gen:'nascitur', de:'geboren werden, entstehen', type:'verb', chapter:59},
  {lat:'gradi', gen:'graditur', de:'schreiten, gehen', type:'verb', chapter:59},
  {lat:'proficisci', gen:'proficíscitur', de:'aufbrechen, abreisen', type:'verb', chapter:59},
  {lat:'ingredi', gen:'ingréditur', de:'eintreten, betreten, beginnen', type:'verb', chapter:59},
  {lat:'egredi', gen:'egréditur', de:'hinausgehen, aussteigen', type:'verb', chapter:59},
  {lat:'progredi', gen:'progréditur', de:'vorwärtsgehen, vorrücken', type:'verb', chapter:59},
  {lat:'aggredi', gen:'aggréditur', de:'angreifen, herantreten, anpacken', type:'verb', chapter:59},
  {lat:'iter', gen:'itineris n.', de:'Weg, Reise, Marsch', type:'noun', chapter:59},
  {lat:'comes', gen:'comitis m./f.', de:'Begleiter, Begleiterin, Gefährte', type:'noun', chapter:59},
  {lat:'dux', gen:'ducis m.', de:'Anführer, Führer, Feldherr', type:'noun', chapter:59},
  {lat:'miles', gen:'militis m.', de:'Soldat, Krieger', type:'noun', chapter:59},
  {lat:'hostis', gen:'-is m.', de:'Feind (Staatsfeind), Gegner', type:'noun', chapter:59},
  {lat:'signum', gen:'-i n.', de:'Zeichen, Signal, Feldzeichen', type:'noun', chapter:59},
  {lat:'castra', gen:'-orum n.pl.', de:'Lager, Feldlager', type:'noun', chapter:59},
  {lat:'acies', gen:'-ei f.', de:'Schlachtreihe, Schärfe', type:'noun', chapter:59},

  {lat:'impedire', gen:'impedit', de:'hindern, aufhalten, behindern', type:'verb', chapter:59},
  {lat:'oppidum', gen:'-i n.', de:'Stadt (befestigt), Ortschaft', type:'noun', chapter:59},
  {lat:'vallum', gen:'-i n.', de:'Wall, Befestigung, Palisade', type:'noun', chapter:59},
  {lat:'fossa', gen:'-ae f.', de:'Graben, Grube', type:'noun', chapter:59},
  // ========== LEKTION 60 – Semideponentien, quidam ==========
  {lat:'audere', gen:'audet', de:'wagen, sich erkühnen', type:'verb', chapter:60},
  {lat:'solere', gen:'solet', de:'pflegen, gewohnt sein', type:'verb', chapter:60},
  {lat:'fidere', gen:'fidit', de:'vertrauen (+Dat./Abl.)', type:'verb', chapter:60},
  {lat:'gaudere', gen:'gaudet', de:'sich freuen (Semidep.)', type:'verb', chapter:60},
  {lat:'ius', gen:'iuris n.', de:'Recht, Gesetz, Befugnis', type:'noun', chapter:60},
  {lat:'iustitia', gen:'-ae f.', de:'Gerechtigkeit', type:'noun', chapter:60},
  {lat:'aequitas', gen:'-atis f.', de:'Gleichheit, Billigkeit, Gerechtigkeit', type:'noun', chapter:60},
  {lat:'mos', gen:'moris m.', de:'Sitte, Brauch; pl. mores – Sitten, Charakter', type:'noun', chapter:60},
  {lat:'honor', gen:'-oris m.', de:'Ehre, Ehrung, Amt', type:'noun', chapter:60},
  {lat:'dignitas', gen:'-atis f.', de:'Würde, Ansehen, Stand', type:'noun', chapter:60},
  {lat:'vix', gen:'', de:'kaum, mit Mühe', type:'adv', chapter:60},
  {lat:'paene', gen:'', de:'fast, beinahe', type:'adv', chapter:60},
  {lat:'prope', gen:'', de:'nahe (bei), fast', type:'adv', chapter:60},
  {lat:'procul', gen:'', de:'weit entfernt, fern', type:'adv', chapter:60},
  {lat:'frustra', gen:'', de:'vergebens, umsonst', type:'adv', chapter:60},

  {lat:'tutus', gen:'a, um', de:'sicher, geschützt', type:'adj', chapter:60},
  {lat:'integer', gen:'integra, integrum', de:'unberührt, unversehrt, unparteiisch', type:'adj', chapter:60},
  {lat:'innocens', gen:'innocentis', de:'unschuldig, harmlos', type:'adj', chapter:60},
  {lat:'nocens', gen:'nocentis', de:'schuldig, schädlich', type:'adj', chapter:60},
  // ========== LEKTION 61 – Genitiv- und Ablativ-Funktionen ==========
  {lat:'numerus', gen:'-i m.', de:'Zahl, Anzahl, Menge', type:'noun', chapter:61},
  {lat:'multitudo', gen:'-inis f.', de:'Menge, Masse, Volksmenge', type:'noun', chapter:61},
  {lat:'plebs', gen:'plebis f.', de:'einfaches Volk, Plebs', type:'noun', chapter:61},
  {lat:'nobilitas', gen:'-atis f.', de:'Adel, Adelsstand, Berühmtheit', type:'noun', chapter:61},
  {lat:'auctoritas', gen:'-atis f.', de:'Ansehen, Autorität, Einfluss', type:'noun', chapter:61},
  {lat:'gloria', gen:'-ae f.', de:'Ruhm, Ruhmestat', type:'noun', chapter:61},
  {lat:'par', gen:'paris', de:'gleich, ebenbürtig', type:'adj', chapter:61},
  {lat:'impar', gen:'imparis', de:'ungleich, unebenbürtig', type:'adj', chapter:61},
  {lat:'quantus', gen:'a, um', de:'wie groß, wie viel', type:'adj', chapter:61},
  {lat:'tantus', gen:'a, um', de:'so groß, so viel', type:'adj', chapter:61},
  {lat:'tot', gen:'(indekl.)', de:'so viele', type:'adj', chapter:61},
  {lat:'quot', gen:'(indekl.)', de:'wie viele', type:'adj', chapter:61},
  {lat:'aliquot', gen:'(indekl.)', de:'einige, mehrere', type:'adj', chapter:61},
  {lat:'partim', gen:'', de:'zum Teil, teilweise', type:'adv', chapter:61},
  {lat:'satis', gen:'', de:'genug, hinreichend', type:'adv', chapter:61},
  {lat:'nimis', gen:'', de:'zu sehr, allzu', type:'adv', chapter:61},
  {lat:'plus', gen:'', de:'mehr (Adv.)', type:'adv', chapter:61},
  {lat:'minus', gen:'', de:'weniger (Adv.)', type:'adv', chapter:61},

  {lat:'abundare', gen:'abundat', de:'im Überfluss haben, reich sein', type:'verb', chapter:61},
  {lat:'egere', gen:'eget', de:'arm sein, bedürfen (+Gen./Abl.)', type:'verb', chapter:61},
  {lat:'carere', gen:'caret', de:'entbehren, fehlen (+Abl.)', type:'verb', chapter:61},
  {lat:'privare', gen:'privat', de:'berauben, befreien (+Abl.)', type:'verb', chapter:61},
  {lat:'dives', gen:'divitis', de:'reich, wohlhabend', type:'adj', chapter:61},
  {lat:'pauper', gen:'pauperis', de:'arm, ärmlich', type:'adj', chapter:61},
  // ========== LEKTION 62 – Gerundium + Gerundivum ==========
  {lat:'administrare', gen:'administrat', de:'verwalten, leiten, ausführen', type:'verb', chapter:62},
  {lat:'curare', gen:'curat', de:'sorgen für, pflegen, besorgen', type:'verb', chapter:62},
  {lat:'mandare', gen:'mandat', de:'beauftragen, übergeben, befehlen', type:'verb', chapter:62},
  {lat:'tradere', gen:'tradit', de:'übergeben, überliefern, verraten', type:'verb', chapter:62},
  {lat:'spatium', gen:'-ii n.', de:'Raum, Zeitraum, Abstand, Bahn', type:'noun', chapter:62},
  {lat:'tempus', gen:'-oris n.', de:'Zeit, Zeitpunkt, Umstand', type:'noun', chapter:62},
  {lat:'locus', gen:'-i m.', de:'Ort, Stelle, Platz; pl. loca – Gegend', type:'noun', chapter:62},
  {lat:'modus', gen:'-i m.', de:'Maß, Art und Weise, Methode', type:'noun', chapter:62},
  {lat:'ratio', gen:'-onis f.', de:'Vernunft, Methode, Rechenschaft', type:'noun', chapter:62},
  {lat:'imperium', gen:'-ii n.', de:'Befehl, Herrschaft, Reich, Kommando', type:'noun', chapter:62},
  {lat:'potestas', gen:'-atis f.', de:'Macht, Gewalt, Möglichkeit', type:'noun', chapter:62},
  {lat:'causa (post gen.)', gen:'', de:'wegen (als Postposition nach Gen.)', type:'prep', chapter:62},
  {lat:'gratia (post gen.)', gen:'', de:'um ... willen (Postposition nach Gen.)', type:'prep', chapter:62},
  {lat:'ad (+ Gerundivum)', gen:'', de:'um zu... (Zweck mit Gerundivum)', type:'prep', chapter:62},
  {lat:'difficilis', gen:'-e', de:'schwierig, schwer', type:'adj', chapter:62},
  {lat:'facilis', gen:'-e', de:'leicht, einfach', type:'adj', chapter:62},
  {lat:'utilis', gen:'-e', de:'nützlich, brauchbar', type:'adj', chapter:62},
  {lat:'inutilis', gen:'-e', de:'unnütz, unbrauchbar', type:'adj', chapter:62},

  // ========== LEKTION 63 – Gerundivum mit esse ==========
  {lat:'officium', gen:'-ii n.', de:'Pflicht, Amt, Dienst, Gefälligkeit', type:'noun', chapter:63},
  {lat:'munus', gen:'muneris n.', de:'Aufgabe, Amt, Geschenk, Spiel', type:'noun', chapter:63},
  {lat:'labor', gen:'-oris m.', de:'Mühe, Arbeit, Anstrengung', type:'noun', chapter:63},
  {lat:'negotium', gen:'-ii n.', de:'Geschäft, Angelegenheit, Mühe', type:'noun', chapter:63},
  {lat:'otium', gen:'-ii n.', de:'Muße, Ruhe, Frieden', type:'noun', chapter:63},
  {lat:'necessarius', gen:'a, um', de:'notwendig, nötig, unumgänglich', type:'adj', chapter:63},
  {lat:'noxius', gen:'a, um', de:'schädlich, schuldig', type:'adj', chapter:63},
  {lat:'idoneus', gen:'a, um', de:'geeignet, passend', type:'adj', chapter:63},
  {lat:'aptus', gen:'a, um', de:'geeignet, passend, befestigt', type:'adj', chapter:63},
  {lat:'diligentia', gen:'-ae f.', de:'Sorgfalt, Fleiß, Genauigkeit', type:'noun', chapter:63},
  {lat:'cura', gen:'-ae f.', de:'Sorge, Fürsorge, Sorgfalt', type:'noun', chapter:63},
  {lat:'deserere', gen:'deserit', de:'verlassen, im Stich lassen', type:'verb', chapter:63},
  {lat:'neglegere', gen:'neglegit', de:'vernachlässigen, missachten', type:'verb', chapter:63},
  {lat:'sustinere', gen:'sustinet', de:'tragen, aushalten, aufhalten', type:'verb', chapter:63},
  {lat:'tolerare', gen:'tolerat', de:'ertragen, dulden', type:'verb', chapter:63},
  {lat:'subire', gen:'subit', de:'eingehen, auf sich nehmen, erleiden', type:'verb', chapter:63},
  {lat:'difficile est', gen:'', de:'es ist schwierig', type:'verb', chapter:63},
  {lat:'necesse est', gen:'', de:'es ist notwendig', type:'adj', chapter:63},
  {lat:'opus est', gen:'', de:'es ist nötig, es bedarf (+Abl.)', type:'verb', chapter:63},
  {lat:'oportet', gen:'oportuit', de:'es geziemt sich, man soll, man muss', type:'verb', chapter:63},

  // ========== LEKTION 64 – Verb fieri, Korrelativa ==========
  {lat:'fieri', gen:'fit', de:'werden, geschehen, entstehen', type:'verb', chapter:64},
  {lat:'res publica', gen:'rei publicae f.', de:'Staat, Gemeinwesen, Republik', type:'noun', chapter:64},
  {lat:'civitas', gen:'-atis f.', de:'Staat, Bürgerschaft, Stadt', type:'noun', chapter:64},
  {lat:'senatus', gen:'-us m.', de:'Senat', type:'noun', chapter:64},
  {lat:'provincia', gen:'-ae f.', de:'Provinz, Aufgabenbereich', type:'noun', chapter:64},
  {lat:'tributum', gen:'-i n.', de:'Steuer, Abgabe, Tribut', type:'noun', chapter:64},
  {lat:'vectigal', gen:'-alis n.', de:'Steuer, Zoll, Staatseinkommen', type:'noun', chapter:64},
  {lat:'idem', gen:'eadem, idem', de:'derselbe, dieselbe, dasselbe', type:'pron', chapter:64},
  {lat:'alius', gen:'alia, aliud', de:'ein anderer, eine andere, ein anderes', type:'pron', chapter:64},
  {lat:'alter', gen:'altera, alterum', de:'der eine...der andere (von zweien)', type:'pron', chapter:64},
  {lat:'uter', gen:'utra, utrum', de:'wer von beiden? welcher von beiden?', type:'pron', chapter:64},
  {lat:'talis', gen:'tale', de:'solcher Art, so beschaffen', type:'adj', chapter:64},
  {lat:'qualis', gen:'quale', de:'wie beschaffen, von welcher Art', type:'adj', chapter:64},
  {lat:'totiens', gen:'', de:'so oft', type:'adv', chapter:64},
  {lat:'quotiens', gen:'', de:'wie oft, so oft wie', type:'adv', chapter:64},
  {lat:'tam', gen:'', de:'so (bei Adj. und Adv.)', type:'adv', chapter:64},
  {lat:'quam', gen:'', de:'wie, als (Vergleich)', type:'adv', chapter:64},
  {lat:'ita', gen:'', de:'so, folgendermaßen', type:'adv', chapter:64},
  {lat:'populus', gen:'-i m.', de:'Volk, Volksmenge', type:'noun', chapter:64},
  {lat:'rex', gen:'regis m.', de:'König', type:'noun', chapter:64},
  {lat:'tyrannus', gen:'-i m.', de:'Tyrann, Gewaltherrscher', type:'noun', chapter:64},
  {lat:'consul', gen:'-ulis m.', de:'Konsul (höchster Magistrat Roms)', type:'noun', chapter:64},
  {lat:'praetor', gen:'-oris m.', de:'Prätor (Richter, Magistrat)', type:'noun', chapter:64},
  {lat:'magistratus', gen:'-us m.', de:'Magistrat, Staatsbeamter', type:'noun', chapter:64},

  // ========== LEKTION 65 – Perfektopräsentien, NcI ==========
  {lat:'meminisse', gen:'memini', de:'sich erinnern (+Gen./Acc.)', type:'verb', chapter:65},
  {lat:'novisse', gen:'novi', de:'kennen, wissen (Perf. von noscere)', type:'verb', chapter:65},
  {lat:'odisse', gen:'odi', de:'hassen (Perfektopräsens)', type:'verb', chapter:65},
  {lat:'coepisse', gen:'coepi', de:'begonnen haben, anfangen (Perf.)', type:'verb', chapter:65},
  {lat:'videri', gen:'videtur', de:'scheinen, erscheinen (NcI)', type:'verb', chapter:65},
  {lat:'dici', gen:'dicitur', de:'gesagt werden, heißen (NcI)', type:'verb', chapter:65},
  {lat:'nominari', gen:'nominatur', de:'genannt werden (NcI)', type:'verb', chapter:65},
  {lat:'appellari', gen:'appellatur', de:'genannt werden, heißen (NcI)', type:'verb', chapter:65},
  {lat:'existimari', gen:'existimatur', de:'gehalten werden für (NcI)', type:'verb', chapter:65},
  {lat:'creari', gen:'creatur', de:'gewählt werden, geschaffen werden (NcI)', type:'verb', chapter:65},
  {lat:'nomen', gen:'-inis n.', de:'Name, Bezeichnung', type:'noun', chapter:65},
  {lat:'titulus', gen:'-i m.', de:'Aufschrift, Titel, Inschrift', type:'noun', chapter:65},
  {lat:'fama', gen:'-ae f.', de:'Ruf, Gerücht, Nachricht', type:'noun', chapter:65},
  {lat:'peritus', gen:'a, um', de:'erfahren, kundig, bewandert (+Gen.)', type:'adj', chapter:65},
  {lat:'imperitus', gen:'a, um', de:'unerfahren, unkundig', type:'adj', chapter:65},
  {lat:'clarus', gen:'a, um', de:'klar, berühmt, glänzend', type:'adj', chapter:65},
  {lat:'obscurus', gen:'a, um', de:'dunkel, unbekannt, unklar', type:'adj', chapter:65},
  {lat:'ut (+ Indikativ)', gen:'', de:'wie, als, sobald', type:'conj', chapter:65},
  {lat:'ut (+ Konjunktiv)', gen:'', de:'damit, dass (final/konsekutiv)', type:'conj', chapter:65},
  {lat:'cum (temporal)', gen:'', de:'als, wenn, während', type:'conj', chapter:65},
  {lat:'cum (kausal)', gen:'', de:'weil, da (mit Konj.)', type:'conj', chapter:65},
  {lat:'si', gen:'', de:'wenn, falls (Kondizional)', type:'conj', chapter:65},
  {lat:'nisi', gen:'', de:'wenn nicht, außer wenn', type:'conj', chapter:65},
  {lat:'quamquam', gen:'', de:'obwohl, obgleich (mit Ind.)', type:'conj', chapter:65},
  {lat:'quamvis', gen:'', de:'obwohl, wie sehr auch (mit Konj.)', type:'conj', chapter:65},

  // ========== LEKTION 66 – Relativpronomina quisquis/quicumque ==========
  {lat:'quisquis', gen:'quidquid', de:'wer auch immer, was auch immer', type:'pron', chapter:66},
  {lat:'quicumque', gen:'quaecumque, quodcumque', de:'welcher auch immer, jeder der', type:'pron', chapter:66},
  {lat:'accidere', gen:'accidit', de:'geschehen, sich ereignen, zufallen', type:'verb', chapter:66},
  {lat:'contingere', gen:'contingit', de:'sich ereignen, zufallen, berühren', type:'verb', chapter:66},
  {lat:'evenire', gen:'evenit', de:'eintreten, sich ereignen, herauskommen', type:'verb', chapter:66},
  {lat:'apparere', gen:'apparet', de:'erscheinen, offenbar sein, sichtbar werden', type:'verb', chapter:66},
  {lat:'incidere', gen:'incidit', de:'fallen in, geraten in, sich ereignen', type:'verb', chapter:66},
  {lat:'praestare', gen:'praestat', de:'hervorragen, übertreffen, leisten, es ist besser', type:'verb', chapter:66},
  {lat:'res', gen:'rei f.', de:'Sache, Ding, Angelegenheit, Tatsache', type:'noun', chapter:66},
  {lat:'eventus', gen:'-us m.', de:'Ausgang, Ereignis, Ergebnis', type:'noun', chapter:66},
  {lat:'exitus', gen:'-us m.', de:'Ausgang, Ende, Tod', type:'noun', chapter:66},
  {lat:'initium', gen:'-ii n.', de:'Anfang, Beginn', type:'noun', chapter:66},
  {lat:'finis', gen:'-is m.', de:'Ende, Ziel, Grenze', type:'noun', chapter:66},
  {lat:'qualis', gen:'quale', de:'von welcher Art, wie beschaffen', type:'adj', chapter:66},
  {lat:'ubicumque', gen:'', de:'wo auch immer', type:'adv', chapter:66},
  {lat:'undecumque', gen:'', de:'woher auch immer', type:'adv', chapter:66},
  {lat:'utcumque', gen:'', de:'wie auch immer', type:'adv', chapter:66},
  {lat:'quandocumque', gen:'', de:'wann auch immer', type:'adv', chapter:66},
  {lat:'usquam', gen:'', de:'irgendwo, irgendwohin', type:'adv', chapter:66},
  {lat:'nusquam', gen:'', de:'nirgendwo, nirgendwohin', type:'adv', chapter:66},

  // ========== LEKTION 67 – Konjunktiv HS: Potentialis, Deliberativ ==========
  {lat:'via', gen:'-ae f.', de:'Weg, Straße, Methode', type:'noun', chapter:67},
  {lat:'exemplum', gen:'-i n.', de:'Beispiel, Vorbild, Muster', type:'noun', chapter:67},
  {lat:'proverbium', gen:'-ii n.', de:'Sprichwort, Redensart', type:'noun', chapter:67},
  {lat:'dubius', gen:'a, um', de:'zweifelhaft, ungewiss, schwankend', type:'adj', chapter:67},
  {lat:'dubito', gen:'dubitat', de:'zweifeln, zögern, unschlüssig sein', type:'verb', chapter:67},
  {lat:'fortasse', gen:'', de:'vielleicht, möglicherweise', type:'adv', chapter:67},
  {lat:'forsitan', gen:'', de:'vielleicht (mit Konj.)', type:'adv', chapter:67},
  {lat:'forte', gen:'', de:'zufällig, von ungefähr', type:'adv', chapter:67},
  {lat:'sane', gen:'', de:'freilich, wirklich, gewiss', type:'adv', chapter:67},
  {lat:'certe', gen:'', de:'sicherlich, gewiss, jedenfalls', type:'adv', chapter:67},
  {lat:'nonne', gen:'', de:'nicht wahr? (erwartet Ja)', type:'adv', chapter:67},
  {lat:'num', gen:'', de:'etwa? (erwartet Nein); ob (indir. Frage)', type:'adv', chapter:67},
  {lat:'quid faciam?', gen:'', de:'was soll ich tun? (Deliberativ)', type:'verb', chapter:67},
  {lat:'quo eam?', gen:'', de:'wohin soll ich gehen? (Deliberativ)', type:'verb', chapter:67},
  {lat:'quis credat?', gen:'', de:'wer würde glauben? (Potentialis)', type:'verb', chapter:67},
  {lat:'diceres', gen:'', de:'du würdest sagen (Potentialis)', type:'verb', chapter:67},
  {lat:'putares', gen:'', de:'du würdest meinen (Potentialis)', type:'verb', chapter:67},
  {lat:'videres', gen:'', de:'du würdest sehen (Potentialis)', type:'verb', chapter:67},
  {lat:'incola', gen:'-ae m.', de:'Einwohner, Bewohner', type:'noun', chapter:67},
  {lat:'peregrinus', gen:'a, um', de:'fremd, ausländisch', type:'adj', chapter:67},
  {lat:'patrius', gen:'a, um', de:'väterlich, heimatlich', type:'adj', chapter:67},
  {lat:'externus', gen:'a, um', de:'äußerlich, fremd, auswärtig', type:'adj', chapter:67},
  {lat:'internus', gen:'a, um', de:'innerlich, innen', type:'adj', chapter:67},

  // ========== LEKTION 68 – Relativsatz ohne Bezugswort ==========
  {lat:'patria', gen:'-ae f.', de:'Vaterland, Heimat', type:'noun', chapter:68},
  {lat:'civis', gen:'-is m./f.', de:'Bürger, Bürgerin', type:'noun', chapter:68},
  {lat:'libertas', gen:'-atis f.', de:'Freiheit, Unabhängigkeit', type:'noun', chapter:68},
  {lat:'pax', gen:'pacis f.', de:'Frieden, Ruhe', type:'noun', chapter:68},
  {lat:'concordia', gen:'-ae f.', de:'Eintracht, Einigkeit', type:'noun', chapter:68},
  {lat:'discordia', gen:'-ae f.', de:'Zwietracht, Uneinigkeit', type:'noun', chapter:68},
  {lat:'amicitia', gen:'-ae f.', de:'Freundschaft, Freundlichkeit', type:'noun', chapter:68},
  {lat:'inimicitia', gen:'-ae f.', de:'Feindschaft, Feindseligkeit', type:'noun', chapter:68},
  {lat:'probare', gen:'probat', de:'billigen, beweisen, gutheißen', type:'verb', chapter:68},
  {lat:'improbare', gen:'improbat', de:'missbilligen, verwerfen', type:'verb', chapter:68},
  {lat:'vituperare', gen:'vituperat', de:'tadeln, kritisieren, schmähen', type:'verb', chapter:68},
  {lat:'defendere', gen:'defendit', de:'verteidigen, schützen', type:'verb', chapter:68},
  {lat:'accusare', gen:'accusat', de:'anklagen, beschuldigen', type:'verb', chapter:68},
  {lat:'qui ... is', gen:'', de:'wer ... der (Relativsatz ohne Bezugswort)', type:'pron', chapter:68},
  {lat:'quod ... id', gen:'', de:'was ... das (Relativsatz ohne Bezugswort)', type:'pron', chapter:68},
  {lat:'ut (final)', gen:'', de:'damit, um zu (Final-Satz)', type:'conj', chapter:68},
  {lat:'ne (final)', gen:'', de:'damit nicht (Negation in Finalsatz)', type:'conj', chapter:68},
  {lat:'nec/neque', gen:'', de:'und nicht, auch nicht', type:'conj', chapter:68},
  {lat:'vel', gen:'', de:'oder (auch), oder vielmehr', type:'conj', chapter:68},
  {lat:'aut', gen:'', de:'oder (ausschließend)', type:'conj', chapter:68},
  {lat:'sive ... sive', gen:'', de:'sei es ... oder, ob ... oder', type:'conj', chapter:68},
  {lat:'tam ... quam', gen:'', de:'so ... wie', type:'conj', chapter:68},
  {lat:'et ... et', gen:'', de:'sowohl ... als auch', type:'conj', chapter:68},
  {lat:'neque ... neque', gen:'', de:'weder ... noch', type:'conj', chapter:68},
  {lat:'foedus', gen:'-eris n.', de:'Bündnis, Vertrag', type:'noun', chapter:68},
  {lat:'pactum', gen:'-i n.', de:'Abkommen, Vertrag, Abmachung', type:'noun', chapter:68},
  {lat:'bellum', gen:'-i n.', de:'Krieg', type:'noun', chapter:68},
  {lat:'victoria', gen:'-ae f.', de:'Sieg', type:'noun', chapter:68},
  {lat:'clades', gen:'-is f.', de:'Niederlage, Katastrophe, Verwüstung', type:'noun', chapter:68},
];

// ========== GRAMMATIK-SCHNELLREFERENZ ==========

const LATIN_GRAMMAR = [
  {
    topic: 'Komparation der Adjektive',
    lektion: '51-52',
    content: `<h3>Steigerung der Adjektive</h3>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Positiv</th><th>Komparativ</th><th>Superlativ</th></tr>
  <tr><td>longus, a, um</td><td>longior, longius</td><td>longissimus, a, um</td></tr>
  <tr><td>fortis, forte</td><td>fortior, fortius</td><td>fortissimus, a, um</td></tr>
  <tr><td>acer, acris, acre</td><td>acrior, acrius</td><td>acerrimus, a, um</td></tr>
  <tr><td>bonus, a, um</td><td>melior, melius</td><td>optimus, a, um</td></tr>
  <tr><td>malus, a, um</td><td>peior, peius</td><td>pessimus, a, um</td></tr>
  <tr><td>magnus, a, um</td><td>maior, maius</td><td>maximus, a, um</td></tr>
  <tr><td>parvus, a, um</td><td>minor, minus</td><td>minimus, a, um</td></tr>
  <tr><td>multus, a, um</td><td>plus, pluris</td><td>plurimus, a, um</td></tr>
</table>
<p><b>Ablativ des Vergleichs:</b> Caesar fortior Pompeio est. = Caesar ist tapferer als Pompeius.</p>
<p><b>Komparation mit quam:</b> Caesar fortior quam Pompeius est.</p>`
  },
  {
    topic: 'Partizipien im Überblick',
    lektion: '53',
    content: `<h3>Alle Partizipien</h3>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Name</th><th>Bildung</th><th>Bedeutung</th><th>Zeitverhältnis</th></tr>
  <tr><td>Partizip Präsens Aktiv (PPA)</td><td>Stamm + -ns, -ntis</td><td>aktiv, gleichzeitig</td><td>gleichzeitig</td></tr>
  <tr><td>Partizip Perfekt Passiv (PPP)</td><td>PPP-Stamm + -us, a, um</td><td>passiv, vorzeitig</td><td>vorzeitig</td></tr>
  <tr><td>Partizip Futur Aktiv (PFA)</td><td>PPP-Stamm + -urus, a, um</td><td>aktiv, nachzeitig</td><td>nachzeitig</td></tr>
  <tr><td>Gerundivum (PFP)</td><td>Inf.-Stamm + -ndus, a, um</td><td>passiv, Notwendigkeit</td><td>nachzeitig/Pflicht</td></tr>
</table>
<p><b>PFA Beispiel:</b> milites pugnaturi = Soldaten, die kämpfen werden</p>`
  },
  {
    topic: 'AcI – Zeitstufen',
    lektion: '53-54',
    content: `<h3>Accusativus cum Infinitivo (AcI)</h3>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Zeitstufe</th><th>Infinitiv (Aktiv)</th><th>Infinitiv (Passiv)</th></tr>
  <tr><td>Gleichzeitigkeit</td><td>amare (Inf. Präs.)</td><td>amari</td></tr>
  <tr><td>Vorzeitigkeit</td><td>amavisse (Inf. Perf.)</td><td>amatum esse</td></tr>
  <tr><td>Nachzeitigkeit</td><td>amaturum esse (Inf. Fut.)</td><td>–</td></tr>
</table>
<p><b>Beispiel:</b> Credo Romanos victuros esse. = Ich glaube, dass die Römer siegen werden.</p>`
  },
  {
    topic: 'Gerundium und Gerundivum',
    lektion: '55, 62-63',
    content: `<h3>Gerundium (Verbalnomen)</h3>
<p>Das Gerundium ist ein Verbalnomen (Neutrum) und wird nur im Gen., Dat., Acc., Abl. gebraucht.</p>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Kasus</th><th>Beispiel</th><th>Übersetzung</th></tr>
  <tr><td>Gen.</td><td>ars legendi</td><td>die Kunst des Lesens</td></tr>
  <tr><td>Dat.</td><td>tempus legendo</td><td>Zeit zum Lesen</td></tr>
  <tr><td>Acc.</td><td>ad legendum</td><td>zum Lesen</td></tr>
  <tr><td>Abl.</td><td>legendo discimus</td><td>durch Lesen lernen wir</td></tr>
</table>
<h3>Gerundivum (Verbaladjektiv)</h3>
<p>Das Gerundivum (auf -ndus/a/um) drückt Notwendigkeit aus: <b>laudandus = zu lobend, lobenswert</b></p>
<p><b>Gerundivum mit esse:</b> Epistula scribenda est. = Der Brief muss geschrieben werden.</p>
<p><b>Persönliche Konstruktion:</b> Mihi epistula scribenda est. = Ich muss den Brief schreiben.</p>`
  },
  {
    topic: 'Konjunktiv im Hauptsatz',
    lektion: '56-57, 67',
    content: `<h3>Konjunktiv im Hauptsatz – Übersicht</h3>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Modus</th><th>Konjunktiv</th><th>Bedeutung</th><th>Beispiel</th></tr>
  <tr><td>Optativ (erfüllbar)</td><td>Konjunktiv Präsens</td><td>Wunsch (möge...)</td><td>Vivat rex! – Es lebe der König!</td></tr>
  <tr><td>Optativ (unerfüllbar Gegenwart)</td><td>Konjunktiv Imperfekt</td><td>nicht erfüllbarer Wunsch</td><td>Utinam adesses! – Wenn du doch hier wärst!</td></tr>
  <tr><td>Optativ (unerfüllbar Vergangenheit)</td><td>Konjunktiv Plusquamperfekt</td><td>Wunsch in Vergangenheit</td><td>Utinam adfuisses! – Wenn du doch dabei gewesen wärst!</td></tr>
  <tr><td>Hortativ</td><td>Konjunktiv Präsens 1. Pl.</td><td>Aufforderung (lasst uns...)</td><td>Eamus! – Lasst uns gehen!</td></tr>
  <tr><td>Jussiv</td><td>Konjunktiv Präsens 3. Pers.</td><td>Gebot (er/sie soll...)</td><td>Veniat! – Er soll kommen!</td></tr>
  <tr><td>Prohibitiv</td><td>ne + Konj. Perf.</td><td>Verbot (tu nicht...)</td><td>Ne feceris! – Tu das nicht!</td></tr>
  <tr><td>Potentialis</td><td>Konjunktiv Präsens/Perf.</td><td>Möglichkeit (könnte)</td><td>Quis hoc credat? – Wer würde das glauben?</td></tr>
  <tr><td>Deliberativ</td><td>Konjunktiv Präsens</td><td>Überlegung (was soll ich...?)</td><td>Quid faciam? – Was soll ich tun?</td></tr>
</table>`
  },
  {
    topic: 'Deponentien',
    lektion: '58-59',
    content: `<h3>Deponentien – Passivform mit aktiver Bedeutung</h3>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Konjugation</th><th>Infinitiv</th><th>1. Sg. Präs.</th><th>Beispiel</th></tr>
  <tr><td>a-Konjugation</td><td>conari</td><td>conor</td><td>versuchen</td></tr>
  <tr><td>e-Konjugation</td><td>vereri</td><td>vereor</td><td>fürchten</td></tr>
  <tr><td>i-Konjugation</td><td>mentiri</td><td>mentior</td><td>lügen</td></tr>
  <tr><td>kons. Konjugation</td><td>loqui</td><td>loquor</td><td>sprechen</td></tr>
</table>
<p><b>Partizipien der Deponentien:</b></p>
<ul>
  <li>PPA: aktiv (loquens = sprechend)</li>
  <li>PPP: <b>aktiv!</b> (locutus = nachdem er gesprochen hatte)</li>
  <li>PFA: aktiv (locuturus = im Begriff zu sprechen)</li>
</ul>
<p><b>Semideponentien:</b> Aktiv im Präsensstamm, Deponent im Perfektstamm (z.B. audere – ausus sum)</p>`
  },
  {
    topic: 'NcI – Nominativus cum Infinitivo',
    lektion: '65',
    content: `<h3>Nominativus cum Infinitivo (NcI)</h3>
<p>Bei passivischen Verba dicendi et sentiendi (sagen, scheinen, glauben) im Passiv:</p>
<ul>
  <li>AcI → NcI: Das Subjekt des AcI wird Nominativ</li>
  <li>Der Infinitiv bleibt erhalten</li>
</ul>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>AcI (aktiv)</th><th>NcI (passiv)</th></tr>
  <tr><td>Dicunt Caesarem venire.</td><td>Caesar dicitur venire.</td></tr>
  <tr><td>Man sagt, Caesar komme.</td><td>Caesar soll kommen. / Caesar kommt angeblich.</td></tr>
</table>
<p><b>Verben die NcI bilden:</b> videri (scheinen), dici (gesagt werden), putari, existimari, creari, nominari, appellari</p>`
  },
  {
    topic: 'Konjunktiv in Relativsätzen',
    lektion: '66',
    content: `<h3>Konjunktiv in Relativsätzen</h3>
<ul>
  <li><b>Verallgemeinernd:</b> quicumque/quisquis + Konj. → wer auch immer</li>
  <li><b>Charakterisierend:</b> Konj. beschreibt eine Art/Eigenschaft</li>
  <li><b>Kausaler Relativsatz:</b> quod + Konj. → weil (subjektiv)</li>
  <li><b>Konzessiver Relativsatz:</b> quamquam/cum + Konj. → obwohl</li>
</ul>
<p><b>Beispiel:</b> Is consul est, qui patriam amet. = Der ist Konsul, der (wie man von ihm erwartet) das Vaterland liebt.</p>`
  },
  {
    topic: 'Relativsatz ohne Bezugswort',
    lektion: '68',
    content: `<h3>Relativsatz ohne Bezugswort</h3>
<p>Das Bezugswort ist nicht vorhanden – es wird durch den Relativsatz ausgedrückt.</p>
<table border="1" style="border-collapse:collapse; width:100%">
  <tr><th>Lateinisch</th><th>Deutsch</th></tr>
  <tr><td>Qui amat, felix est.</td><td>Wer liebt, ist glücklich. (= Is, qui amat, felix est.)</td></tr>
  <tr><td>Quod dixit, verum est.</td><td>Was er sagte, ist wahr.</td></tr>
  <tr><td>Quo profectus es, ibi maneo.</td><td>Wo du hingegangen bist, da bleibe ich.</td></tr>
</table>
<p><b>Verschränkter Relativsatz:</b> Das Relativpronomen gehört gleichzeitig zu zwei Sätzen.</p>
<p>Quam quisque norit artem, in hac se exerceat. = In der Kunst, die jeder kennt, soll er sich üben.</p>`
  }
];

// Export für Node.js / Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LATIN_VOCAB, LATIN_GRAMMAR };
}
