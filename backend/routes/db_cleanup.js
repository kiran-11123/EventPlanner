import Event_data from "../Mongodb/Events_data";

async function cleanup() {

    try {

        const cutoff = new Date();
        const allEvents = await Event_data.find();

        const filteredData = allEvents.filter((e) => {

            if (e.EventDate !== 'everyday') {

                const parts = e.EventDate.split("-");
                const date = new Date(parts[2], parts[1] - 1, parts[0]);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return date > today;

            }
        })

        const idsToDelete = filteredData.map(e => {
            return e._id;
        });
        await Event_data.deleteMany({
            _id: { $in: idsToDelete }
        })



    }
    catch (er) {

        console.log("Error while cleaning the Database", er);
    }
}

cleanup();