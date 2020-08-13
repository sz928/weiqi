/**登录请求 */
interface loginReq {
    /**房间ID */
    roomid: number;
}
/**登录响应 */
interface loginRes {
    /**加入成功为0,失败为-1 */
    code: number
    /**当前玩家执棋颜色 */
    meColreBlack: boolean;
    pieceArr: piece[];
}
/**棋子mode */
interface piece {
    x: number;
    y: number;
    isBlack: boolean;
}

/**房间状态 */
interface roomSync {
    playerCount: number;
    nowColreBlack: boolean;
}

/**下棋请求 */
interface playChessReq {
    roomid: number,
    piece: piece;
}
// 下棋响应
interface playChessRes {
    code: number,
    piece: piece;
}

// 结算推送
interface resultPush {
    isBlackWin: boolean;
}

/**新局 */
interface newGameReq {
    roomid: number
}

enum MsgId {
    login,
    roomSync,
    playChess,
    resultPush,
    newGameReq
}