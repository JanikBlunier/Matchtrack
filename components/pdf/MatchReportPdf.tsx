import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

type MatchEvent = {
    id: string;
    minute: number;
    team: "home" | "away";
    type: string;
    player?: string;
    outPlayer?: string;
    inPlayer?: string;
};

type Props = {
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
    bericht: string;
    events: MatchEvent[];
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
    },

    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },

    scoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    teamLeft: {
        width: "40%",
        textAlign: "left",
        fontSize: 14,
    },

    scoreCenter: {
        width: "20%",
        textAlign: "center",
        fontSize: 16,
    },

    teamRight: {
        width: "40%",
        textAlign: "right",
        fontSize: 14,
    },

    sectionTitle: {
        fontSize: 13,
        marginBottom: 10,
    },

    timelineHeader: {
        flexDirection: "row",
        borderBottom: "1 solid #ccc",
        marginBottom: 8,
        paddingBottom: 4,
    },

    homeHeader: {
        width: "40%",
        textAlign: "left",
    },

    minuteHeader: {
        width: "20%",
        textAlign: "center",
    },

    awayHeader: {
        width: "40%",
        textAlign: "right",
    },

    eventRow: {
        flexDirection: "row",
        marginBottom: 6,
    },

    homeCell: {
        width: "40%",
        textAlign: "left",
    },

    minuteCell: {
        width: "20%",
        textAlign: "center",
        fontWeight: "bold",
    },

    awayCell: {
        width: "40%",
        textAlign: "right",
    },

    reportBox: {
        marginTop: 25,
        border: "1 solid #ddd",
        padding: 10,
    },

    reportText: {
        fontSize: 11,
        lineHeight: 1.4,
    },
});

function formatEvent(type: string) {
    switch (type) {
        case "goal":
            return "Tor";
        case "yellow":
            return "Gelbe Karte";
        case "red":
            return "Rote Karte";
        case "sub":
            return "Auswechslung";
        default:
            return type;
    }
}

function eventText(e: MatchEvent) {
    if (e.type === "sub") {
        return `${formatEvent(e.type)}: ${e.outPlayer ?? "-"} → ${e.inPlayer ?? "-"}`;
    }

    return `${formatEvent(e.type)}: ${e.player ?? "-"}`;
}

export default function MatchReportPdf({
                                           homeName,
                                           awayName,
                                           homeScore,
                                           awayScore,
                                           bericht,
                                           events,
                                       }: Props) {
    const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Match Report</Text>

                <View style={styles.scoreRow}>
                    <Text style={styles.teamLeft}>{homeName}</Text>
                    <Text style={styles.scoreCenter}>
                        {homeScore} : {awayScore}
                    </Text>
                    <Text style={styles.teamRight}>{awayName}</Text>
                </View>

                <Text style={styles.sectionTitle}>Spielverlauf</Text>

                <View style={styles.timelineHeader}>
                    <Text style={styles.homeHeader}>{homeName}</Text>
                    <Text style={styles.minuteHeader}>Min</Text>
                    <Text style={styles.awayHeader}>{awayName}</Text>
                </View>

                {sortedEvents.map((e) => (
                    <View key={e.id} style={styles.eventRow}>
                        <Text style={styles.homeCell}>
                            {e.team === "home" ? eventText(e) : ""}
                        </Text>

                        <Text style={styles.minuteCell}>{e.minute}'</Text>

                        <Text style={styles.awayCell}>
                            {e.team === "away" ? eventText(e) : ""}
                        </Text>
                    </View>
                ))}

                <Text style={{ marginTop: 20 }}>Bericht</Text>

                <View style={styles.reportBox}>
                    <Text style={styles.reportText}>
                        {bericht.trim() ? bericht : "Kein Bericht eingetragen"}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}